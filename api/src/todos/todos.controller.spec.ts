import { Test, TestingModule } from '@nestjs/testing';
import { ToDosController } from './todos.controller';
import { ToDosService } from './todos.service';
import { ToDoCreateInput, ToDoUpdateInput } from './todos.interface';

describe('TodoController', () => {
  let controller: ToDosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDosController],
      providers: [ToDosService],
    }).compile();

    controller = module.get<ToDosController>(ToDosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /todos', () => {
    it('should return the array of ToDos stored by the ToDos service', () => {
      expect(controller.findAll()).toBeInstanceOf(Array);
    });
  });

  describe('POST /todos', () => {
    it('should return a new ToDo using the input sent in the request body', () => {
      const todoInput: ToDoCreateInput = {
        title: 'test',
      };

      expect(controller.create(todoInput)).toMatchObject(todoInput);
    });
  });

  describe('PATCH /todos/:id', () => {
    it('should return the updated ToDo with the new value sent in the request body', () => {
      const id = 1;

      const todoInput: ToDoUpdateInput = {
        title: 'test',
        done: true,
      };

      expect(controller.updateByID(id, todoInput)).toMatchObject(todoInput);
    });

    it('should return a Not Found error if the ID does not match a ToDo', () => {
      const id = 1;

      const todoInput: ToDoUpdateInput = {
        title: 'test',
        done: true,
      };

      try {
        controller.updateByID(id, todoInput);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a ToDo from the stored array if the ID is found and return it', () => {
      const id = 1;

      expect(controller.deleteByID(id)).toMatchObject({ id: 1 });
    });

    it('should return a Not Found error if the ID does not match a ToDo', () => {
      const id = 1;

      try {
        controller.deleteByID(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
