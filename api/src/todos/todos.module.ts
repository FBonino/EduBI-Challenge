import { Module } from '@nestjs/common';
import { ToDosService } from './todos.service';
import { ToDosController } from './todos.controller';
import { ToDo } from '../typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  providers: [ToDosService],
  controllers: [ToDosController],
})
export class ToDosModule {}
