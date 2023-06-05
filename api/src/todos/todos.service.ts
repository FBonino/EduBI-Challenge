import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ToDo, ToDoCreateInput, ToDoUpdateInput } from './todos.interface';

@Injectable()
export class ToDosService {
  private readonly todos: ToDo[] = [
    {
      id: 1,
      title: 'test',
      done: false,
    },
  ];

  findAll(): ToDo[] {
    return this.todos;
  }

  create(todoInput: ToDoCreateInput): ToDo {
    const newToDo: ToDo = {
      id: 1,
      done: false,
      ...todoInput,
    };

    this.todos.push(newToDo);

    return newToDo;
  }

  updateByID(id: number, todoInput: ToDoUpdateInput): ToDo {
    const index: number = this.todos.findIndex((todo) => todo.id);

    if (index === -1) {
      throw new HttpException('ToDo not found', HttpStatus.NOT_FOUND);
    }

    const updatedToDo = { ...this.todos[index], ...todoInput };

    this.todos[index] = updatedToDo;

    return updatedToDo;
  }

  deleteByID(id: number): ToDo {
    let deletedToDo: ToDo | undefined;
    const updatedArray: ToDo[] = [];

    for (const todo of this.todos) {
      todo.id !== id ? updatedArray.push(todo) : (deletedToDo = todo);
    }

    if (!deletedToDo) {
      throw new HttpException('ToDo not found', HttpStatus.NOT_FOUND);
    }

    return deletedToDo;
  }
}
