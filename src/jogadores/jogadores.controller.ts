import { Controller, Post, Body, Get, Query, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { get } from 'http';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { validacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {}
    
    @Post() 
    @UsePipes(ValidationPipe)
    async criarJogador(
      @Body() criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
         
        return this.jogadoresService.criarJogador(criaJogadorDto);
    }

    @Put('/:_id') 
    @UsePipes(ValidationPipe)
    async atualizarJogador(
      @Body() atualizarJogadorDto: AtualizarJogadorDto, @Param('_id', validacaoParametrosPipe) _id: string): Promise<void> {
         
        this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
    }


    @Get()
    async consultarJogadores(): Promise<Jogador[]>{
         
        return await this.jogadoresService.consultarTodosJogadores(); 
    }

    @Get('/:_id')
    async consultarJogadorPeloId(
      @Param() _id: string) : Promise<Jogador>{
         
        return await this.jogadoresService.consultarJogadoresPeloId(_id); 
    }


    @Delete('/:_id')
    async deletarJogador(
      @Param('_id', validacaoParametrosPipe) _id: string ) : Promise<void> {
        this.jogadoresService.deletarJogador(_id);
      }

}
