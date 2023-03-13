import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
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

    async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador>{

      // Ref: Desestruturação do email recebido
      const {email} = criaJogadorDto;   
      // Ref: Procure jogador pelo email
      const jogadorEncontrado  = await this.jogadorModel.findOne({email}).exec();

      if (jogadorEncontrado) {
        throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`);
      } 

     // await this.criar(criaJogadorDto);

      const jogadorCriado = new this.jogadorModel(criaJogadorDto);

      return await jogadorCriado.save();

    }


    async atualizarJogador(_id: string, criarJogadorDto: CriarJogadorDto): Promise<void>{
      

      // Ref: Procure jogador pelo email
      const jogadorEncontrado  = await this.jogadorModel.findOne({_id}).exec();

      if (!jogadorEncontrado) {
        throw new NotFoundException(`Jogador com id:${_id} - não foi encontrado`);
      }      

      await this.jogadorModel.findOneAndUpdate({_id}, {$set: criarJogadorDto}).exec();


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

   
}
