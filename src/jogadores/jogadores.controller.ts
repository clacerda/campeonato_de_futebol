import { Controller, Post, Body, Get, Query, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
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
    async criarJogador(
      @Body() criaJogadorDto: CriarJogadorDto ){
         
        this.jogadoresService.criarJogador(criaJogadorDto);

    }

    @Put('/:_id') 
    @UsePipes(ValidationPipe)
    async atualizarJogador(
      @Body() criaJogadorDto: CriarJogadorDto, @Param('_id', jogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
         
        this.jogadoresService.atualizarJogador(criaJogadorDto);

    }


    @Get()
    async consultarJogadores(): Promise<Jogador[]>{
         
        return await this.jogadoresService.consultarTodosJogadores(); 
    }

    @Get('/:_id')
    async consultarJogadorPeloId(
      @Param('email', jogadoresValidacaoParametrosPipe) _id: string) : Promise<Jogador>{
         
        return await this.jogadoresService.consultarJogadoresPorEmail(_id); 
    }


    @Delete('/:_id')
    async deletarJogador(
      @Param('_id', jogadoresValidacaoParametrosPipe) _id: string ) : Promise<void> {
        this.jogadoresService.deletarJogador(_id);
      }

}
