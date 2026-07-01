import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto} from './dto/create-usuario.dto'; 
import { DatabaseService} from 'src/database/database.service';
import { hash} from 'bcrypt';

@Injectable()
export class UsuariosService {
    // Injetamos databaseService para poder acessar o banco 
    constructor(private readonly databaseService: DatabaseService) {}

    // Método responsável por criar um usuário
    async criar(createUsuarioDto: CreateUsuarioDto){
        // Extraimos os dados enviados no corpo da requisição
        const { nome, email, senha } = createUsuarioDto;

        const senhaHash = await hash(senha, 10);

        // Comandos SQL para inserir o usuário no banco de dados
        const sql = `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`;

        // Neste primeiro momento, salvaremos a senha como o usuário digitar
        await this.databaseService.query(sql, [nome, email, senhaHash]);

        return { 
            mensagem: 'Usuário criado com sucesso!' 
        };
    }
}
