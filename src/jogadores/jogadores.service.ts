import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {};  

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void>{
      // Ref: Desestruturação do email recebido
      const {email} = criaJogadorDto;   
      // Ref: Procure jogador pelo email
      const jogadorEncontrado  = await this.jogadorModel.findOne({email}).exec();

      if (jogadorEncontrado) {
        this.atualizar(jogadorEncontrado, criaJogadorDto);
      } else{
        this.criar(criaJogadorDto);
      }       
    }

    async deletarJogador(email): Promise<void>{

      const jogadorEncontrado =  this.jogadores.find(jogador => jogador.email === email);
      this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);

    }

    async consultarJogadoresPorEmail(email: string): Promise<Jogador> {
      
      const jogadorEncontrado =  this.jogadores.find(jogador => jogador.email === email);

      if (!jogadorEncontrado) {
        throw new NotFoundException(`Jogador com email ${email} não foi encontrado.`)
      }


      return jogadorEncontrado;
    }

    async consultarTodosJogadores(): Promise<Jogador[]>{
      return await this.jogadores;
    }

    private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
      // Ref: Cria um novo jogador.
      const jogadorCriado = new this.jogadorModel(criaJogadorDto);

      return await jogadorCriado.save();
 

    }

    private async atualizar(jogadorEncontrado: Jogador, criaJogadorDto: CriarJogadorDto): Promise<Jogador>{
        // Ref: Realiza o update de acordo com o email.
        return await this.jogadorModel.findOneAndUpdate({email: criaJogadorDto.email}, {$set: criaJogadorDto}).exec();
 
    }
    
}
