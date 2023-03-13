import { Controller, Post, Body, Get, Query, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { jogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {}
    
    @Post() 
    @UsePipes(ValidationPipe)
    async criarAtualizarJogador(
        @Body() criaJogadorDto: CriarJogadorDto ){
         
          this.jogadoresService.criarAtualizarJogador(criaJogadorDto);

    }
    @Get()
    async consultarJogadores(
      @Query('email', jogadoresValidacaoParametrosPipe) email: string
    ) : Promise<Jogador[] | Jogador>{
        
      if (email) {
        return await this.jogadoresService.consultarJogadoresPorEmail(email);
      }else{
        return await this.jogadoresService.consultarTodosJogadores();
      } 
    }

    @Delete()
    async deletarJogador(
      @Query('email', jogadoresValidacaoParametrosPipe) email: string ) : Promise<void> {
        this.jogadoresService.deletarJogador(email);
      }

}
