import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria.interface'; 
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria-dto';

@Injectable()
export class CategoriasService {

    constructor(
      @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>) {}


    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {

      const { categoria } = criarCategoriaDto;

      const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

      if (categoriaEncontrada) {
        throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
      }

      const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
      return await categoriaCriada.save();

    }

    async consultarTodasCategorias(): Promise<Array<Categoria>> {
      return await this.categoriaModel.find().exec();
    }

    async consultarCategoriaPorID(categoria: string): Promise<Categoria> {

      const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

      if (!categoriaEncontrada) {
        throw new NotFoundException (`Categoria ${categoria} não foi encontrada.`);
      }

      return categoriaEncontrada;
    }


    async atualizarCategoria(categoria: String, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
      
      const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
      
      if (!categoriaEncontrada) {
        throw new NotFoundException (`Categoria ${categoria} não foi encontrada.`);
      }

      await this.categoriaModel.findOneAndUpdate({categoria}, {$set: atualizarCategoriaDto}).exec();
      
    }

}
