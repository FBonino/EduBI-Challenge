import { Test, TestingModule } from '@nestjs/testing';
import { ToDosService } from './todos.service';
import { ToDoCreateInput, ToDoUpdateInput } from './todos.interface';

describe('TodoService', () => {
  let service: ToDosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDosService],
    }).compile();

    service = module.get<ToDosService>(ToDosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('FindAll method', () => {
    it('should return an array of stored ToDos when using the findAll method', () => {
      expect(service.findAll()).toBeInstanceOf(Array);
    });
  });

  describe('Create method', () => {
    it('should return a ToDo using the values passed as arguments when using the create method', () => {
      const todoInput: ToDoCreateInput = {
        title: 'test',
      };

      expect(service.create(todoInput)).toMatchObject(todoInput);
    });
  });

  describe('UpdateByID method', () => {
    it('should return the updated ToDo using the values passed as arguments when using the update method', () => {
      const id = 1;

      const todoInput: ToDoUpdateInput = {
        title: 'test',
        done: true,
      };

      expect(service.updateByID(id, todoInput)).toMatchObject(todoInput);
    });

    it('should return a Not Found error if the ID used to update does not match a ToDo', () => {
      const id = 1;

      const todoInput: ToDoUpdateInput = {
        title: 'test',
        done: true,
      };

      try {
        service.updateByID(id, todoInput);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('DeleteByID method', () => {
    it('should return the deleted ToDo when using the delete method', () => {
      const id = 1;

      expect(service.deleteByID(id)).toMatchObject({ id: 1 });
    });

    it('should return a Not Found error if the ID used to delete does not match a ToDo', () => {
      const id = 1;

      try {
        service.deleteByID(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
