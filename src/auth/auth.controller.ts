import { Controller, Post, Body, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) { }

    @Post('login')
    async login(@Body() body: LoginDto) {
        const response = await this.authService.login(body);
        
        if (response)
            return { payload: this.jwtService.sign({ ...response }) }
            
        throw new UnauthorizedException({ error: "USER_NOT_EXIST", detail: "El usuario no existe" });
    }
}
