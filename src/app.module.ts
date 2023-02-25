import { Module } from '@nestjs/common';
import { JogaresModule } from './jogares/jogares.module';

@Module({
  imports: [JogaresModule],
})
export class AppModule {}
