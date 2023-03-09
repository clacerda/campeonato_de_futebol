import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores/jogadores.controller';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:CIWtDXQkmhp1oGBm@cluster0.bwloubc.mongodb.net/smartTraking?retryWrites=true&w=majority', 
    { useNewUrlParser: true, 

      useUnifiedTopology: true  }),
    JogadoresModule],
  controllers: [JogadoresController],
})
export class AppModule {}
