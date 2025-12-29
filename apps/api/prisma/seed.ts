import 'dotenv/config'; // Load .env at the very top
import { de, faker } from '@faker-js/faker';
import { PrismaClient } from '../src/generated/prisma/client'; // Adjust if needed (check generated folder)
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { hash } from 'argon2';

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db'; // Fallback is crucial!

if (!dbUrl) {
  console.error('DATABASE_URL is not set and no fallback provided!');
  process.exit(1);
}

const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

async function main() {
  console.log('Starting seeding...');

  // Create 10 users

  const defaultPassword=await hash('123')
  const users = Array.from({ length: 10 }).map(() => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: defaultPassword 
  }));

  await prisma.user.createMany({ data: users });
  console.log('Created 10 users');

  // Fetch created users to get real IDs (since SQLite autoincrement starts at 1)
  const createdUsers = await prisma.user.findMany({ select: { id: true } });
  const userIds = createdUsers.map(u => u.id);

  if (userIds.length === 0) {
    throw new Error('No users were created!');
  }

  // Create 30 posts with comments
  const posts = Array.from({ length: 400 }).map(() => {
    const title = faker.lorem.sentence();
    return {
      title,
      slug: generateSlug(title),
      content: faker.lorem.paragraphs(3),
      thumbnail: faker.image.urlLoremFlickr({ category: 'nature' }),
      published: faker.datatype.boolean(),
      authorId: faker.helpers.arrayElement(userIds),
    };
  });

  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        comments: {
          createMany: {
            data: Array.from({ length: faker.number.int({ min: 0, max: 20 }) }).map(() => ({
              content: faker.lorem.sentence(),
              authorId: faker.helpers.arrayElement(userIds),
            })),
          },
        },
      },
    });
  }

  console.log('Created 30 posts with random comments');
  console.log('Seeding completed successfully! 🌱');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });