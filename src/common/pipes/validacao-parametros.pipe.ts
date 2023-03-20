import { ArgumentMetadata, PipeTransform, BadRequestException } from "@nestjs/common";

export class validacaoParametrosPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {

    if (!value) {
      throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado.`); 
    }
 
    return value;
  }

}