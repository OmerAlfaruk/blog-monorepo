import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input'; 
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth_jwtPayload';
import { User } from 'src/generated/prisma/client';
import { CreateUserInput } from 'src/user/dto/create-user.input';




@Injectable()
export class AuthService {
    constructor
    (private prisma: PrismaService, private jwt: JwtService){}

    async validateLocalUser({email,password}:SignInInput) {

        //check user in db
        const user = await this.prisma.user.findUnique({where:{email}});
        if(!user){
            throw new Error("Invalid credentials");
        }
        //verify password
        const isPasswordValid = await verify(user.password,password);  
        if(!isPasswordValid){
            throw new Error("Invalid credentials");
        }
        //return user
        return user;
       
}
async generateToken(userId:number){
    const payload :AuthJwtPayload = {sub:userId};
    const accessToken=await this.jwt.signAsync(payload);
    return accessToken;

}

async login(user:User){
    const accessToken = await this.generateToken(user.id);
    return{
        id:user.id,
        name:user.name,
        email:user.email,
        avatar:user.avatar,
    
        accessToken
    }
 
}

async validateJwtUser(userId:number){
    const user = await this.prisma.user.findUnique({where:{id:userId}});
    if(!user){
        throw new UnauthorizedException("User not found");
    }
    const currentUser = {id:user.id}
    return currentUser;}


    async validateGoogleUser(
        googleUser:CreateUserInput
    ){
        const user = await this.prisma.user.findUnique({where:{email:googleUser.email}});

        if(!user){
            const newUser = await this.prisma.user.create({
                data:googleUser
            });
            const {password,...authUser}=newUser;
           
           
            return authUser;
        }

        const {password,...authUser}=user;
        return authUser;
    }
}
