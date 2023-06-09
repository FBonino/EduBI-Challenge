import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from '../typeorm';
import { Repository } from 'typeorm';
import { CreateToDoDTO, UpdateToDoDTO } from './todos.dtos';

@Injectable()
export class ToDosService {
  constructor(
    @InjectRepository(ToDo) private readonly todoRepository: Repository<ToDo>,
  ) {}

  findAll() {
    return this.todoRepository.find({ order: { id: 'ASC' } });
  }

  create(createToDoDTO: CreateToDoDTO) {
    const todo = this.todoRepository.create(createToDoDTO);
    return this.todoRepository.save(todo);
  }

  updateByID(id: number, updateToDoDTO: UpdateToDoDTO) {
    return this.todoRepository.save({ id, ...updateToDoDTO });
  }

  deleteByID(id: number) {
    return this.todoRepository.delete({ id });
  }
}
