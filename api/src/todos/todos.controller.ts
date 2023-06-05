import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { ToDo, ToDoCreateInput, ToDoUpdateInput } from './todos.interface';
import { ToDosService } from './todos.service';

@Controller('todo')
export class ToDosController {
  constructor(private todosService: ToDosService) {}

  @Get()
  findAll(): ToDo[] {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body() todoInput: ToDoCreateInput): ToDo {
    const newToDo: ToDo = this.todosService.create(todoInput);

    return newToDo;
  }

  @Patch(':id')
  updateByID(
    @Param('id', ParseIntPipe) id: number,
    @Body() todoInput: ToDoUpdateInput,
  ): ToDo {
    const todo = this.todosService.updateByID(id, todoInput);
    return todo;
  }

  @Delete(':id')
  deleteByID(@Param('id', ParseIntPipe) id: number): ToDo {
    const todo = this.todosService.deleteByID(id);
    return todo;
  }
}
