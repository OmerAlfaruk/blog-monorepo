import { Controller, Get, UseGuards ,Request,Res, Req} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { get } from 'http';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    handleLogin(@Req() req: Request){
        // This will redirect to Google with prompt=select_account
    }
    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(@Request() req,@Res() res:Response){
        console.log('user:',req.user)
        const userData=await this.authService.login(req.user)

        res.redirect(`http://localhost:3000/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&accessToken=${userData.accessToken}&avatar=${userData.avatar}`)
    }
    @UseGuards(JwtAuthGuard)
    @Get('verify-token')
    verfy(){
        return 'ok';
    }
}
