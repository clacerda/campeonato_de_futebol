import { Controller, Post, Body, Get } from '@nestjs/common';
import { get } from 'http';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service'; 

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {}
    
    @Post()
    async criarAtualizarJogador(
        @Body() criaJogadorDto: CriarJogadorDto ){
         
          this.jogadoresService.criarAtualizarJogador(criaJogadorDto);

    }
    @Get()
    async consultarJogadores(): Promise<Jogador[]>{

      return this.jogadoresService.consultarTodosJogadores();

    }

}
