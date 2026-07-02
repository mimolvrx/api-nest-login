import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto } from './dto/login.dto';
import { Usuario } from './interface/usuario.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService) {}

    async login(loginDto:LoginDto){
        const { email, senha } = loginDto;
        const resultado = await this.databaseService.query(
            'SELECT id, nome, email, senha FROM usuario WHERE email = ?', [email]
        );

        // Convertendo o resultado para uma lista de usuários
        const usuarios = resultado as Usuario[];

        // Pegamos o primeiro usuário encontrado
        const usuario = usuarios[0];

        if(!usuario){
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        // Encontrado o email, vamos comparar a senha digitada com o hash salvo no banco de dados
        const senhaValida = await compare(senha, usuario.senha);

        // Se a senha estiver incorreta, retorna erro
        if(!senhaValida){
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        // Payload é a informação que irá dentro do token
        const payload = {
            id: usuario.id,
            email: usuario.email
        }

        // Geramoos o token JWT com as informações do payload
        const token = this.jwtService.sign(payload);


        return {
            mensagem: 'Login realizado com sucesso',
            acess_token: token, // token usado para as proximas requisições
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        };
    }
}
