import { Module } from '@nestjs/common';
import { ToDosService } from './todos.service';
import { ToDosController } from './todos.controller';

@Module({
  providers: [ToDosService],
  controllers: [ToDosController],
})
export class ToDosModule {}
