# Full-Stack Blog Application

A modern full-stack blog application built with Next.js frontend and NestJS backend, featuring GraphQL API, authentication, comments, and AI chat integration.

## 🚀 Features

- **Authentication**: Google OAuth integration with JWT tokens
- **Blog Management**: Create, read, and manage blog posts
- **Comment System**: Full comment functionality with pagination
- **Like System**: Like/unlike posts with real-time counts
- **AI Chat**: OpenAI-powered chat widget for user assistance
- **Responsive Design**: Modern UI with Tailwind CSS
- **GraphQL API**: Type-safe API with comprehensive error handling

## 🛠 Tech Stack

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **GraphQL Client**: Custom GraphQL client with retry logic
- **UI Components**: Custom components with Radix UI primitives
- **Authentication**: NextAuth.js with Google OAuth
- **AI Integration**: OpenAI API for chat functionality

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: SQLite with Prisma ORM
- **API**: GraphQL with Apollo Server
- **Authentication**: JWT with Passport.js
- **File Upload**: Multer for image handling
- **Validation**: Class-validator and Zod schemas

## 📁 Project Structure

```
blog/
├── apps/
│   ├── front/                 # Next.js Frontend
│   │   ├── app/              # App Router pages
│   │   ├── components/       # Reusable UI components
│   │   ├── lib/             # Utilities and actions
│   │   └── public/          # Static assets
│   └── api/                  # NestJS Backend
│       ├── src/             # Source code
│       ├── prisma/          # Database schema
│       └── uploads/         # File uploads
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google OAuth credentials
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd blog
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create `.env` files in both frontend and backend:

**Frontend (`apps/front/.env.local`)**
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
OPENAI_API_KEY=your-openai-api-key
```

**Backend (`apps/api/.env`)**
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=your-jwt-secret
SESSION_SECRET_KEY=your-session-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. **Database Setup**
```bash
cd apps/api
npx prisma generate
npx prisma db push
```

5. **Start Development Servers**

**Backend:**
```bash
cd apps/api
npm run start:dev
```

**Frontend:**
```bash
cd apps/front
npm run dev
```

## 📊 Database Schema

### Models
- **User**: User accounts with Google OAuth
- **Post**: Blog posts with content and metadata
- **Comment**: User comments on posts
- **Like**: Post likes/reactions
- **Tag**: Post categorization

### Key Relationships
- User → Posts (One-to-Many)
- User → Comments (One-to-Many)
- User → Likes (One-to-Many)
- Post → Comments (One-to-Many)
- Post → Likes (One-to-Many)
- Post ↔ Tags (Many-to-Many)

## 🔧 API Endpoints

### GraphQL Queries
- `posts(skip, take)`: Get paginated posts
- `getpostById(id)`: Get single post by ID
- `getPostCommets(postId, skip, take)`: Get post comments
- `postCommentCount(postId)`: Get comment count

### GraphQL Mutations
- `SignIn(SignInInput)`: User authentication
- `createUser(createUserInput)`: User registration
- `createComment(createCommentInput)`: Create comment
- `likPost(postId)`: Like/unlike post

## 🎨 UI Components

### Core Components
- **Hero**: Landing page hero section
- **Posts**: Blog post listing with pagination
- **CommentSystem**: Complete comment functionality
- **AiChat**: OpenAI-powered chat widget
- **Navbar**: Navigation with authentication

### Form Components
- **CommentForm**: Comment creation form
- **AddComment**: Modal comment form
- **SubmitButton**: Loading state button

## 🔐 Authentication Flow

1. User clicks Google OAuth login
2. Google redirects with authorization code
3. Backend exchanges code for user info
4. JWT token generated and stored in session
5. Frontend receives session with user data
6. Protected routes use JWT for API calls

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd apps/front
npm run build
```

### Backend (Railway/Heroku)
```bash
cd apps/api
npm run build
npm run start:prod
```

## 🧪 Development

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Zod for runtime validation

### Error Handling
- GraphQL error boundaries
- Retry logic for network requests
- User-friendly error messages
- Server-side validation

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support, email [omerkamil974@gmail.com] or create an issue in the repository.