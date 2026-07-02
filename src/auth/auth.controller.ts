import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    // Fazer a injeção de dependencia
    constructor(private readonly authService: AuthService) {}

    // Endpoint post para auth/login
    // Recebe o email e senha para tentar autenticar o usuário
    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }
}
