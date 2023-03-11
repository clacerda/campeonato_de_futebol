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
        this.atualizar(criaJogadorDto);
      } else{
        this.criar(criaJogadorDto);
      }       
    }

    async deletarJogador(email): Promise<any>{

      return await this.jogadorModel.findOneAndRemove({email}).exec();

    }

    async consultarJogadoresPorEmail(email: string): Promise<Jogador> {
      
      const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

      if (!jogadorEncontrado) {
        throw new NotFoundException(`Jogador com email ${email} não foi encontrado.`)
      }

      return jogadorEncontrado;
    }

    async consultarTodosJogadores(): Promise<Jogador[]>{
      
      return await this.jogadorModel.find().exec();
      
    }

    private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
      // Ref: Cria um novo jogador.
      const jogadorCriado = new this.jogadorModel(criaJogadorDto);

      return await jogadorCriado.save();

    }

    private async atualizar(criaJogadorDto: CriarJogadorDto): Promise<Jogador>{

        // Ref: Realiza o update de acordo com o email.
        return await this.jogadorModel.findOneAndUpdate({email: criaJogadorDto.email}, {$set: criaJogadorDto}).exec();
    }
    
}
