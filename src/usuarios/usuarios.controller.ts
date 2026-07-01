import { Controller, Body, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    // Injetamos o usuariosService para acessar a regra de cadastro
    constructor(private readonly usuariosService: UsuariosService) {}

    // Requisição do tipo POST para a rota usuários
    @Post()
    criar(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuariosService.criar(createUsuarioDto);
    }
}
