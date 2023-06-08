import api from '.';
import { ToDoItem } from '../types/todos.types';
import { CreateToDoDTO, UpdateToDoDTO } from '../dtos/todos.dtos';

const todoAPI = {
  findAll: async () => {
    const { data: allToDos } = await api.request<ToDoItem[]>({
      url: '/todos',
      method: 'GET',
    });

    return allToDos;
  },
  create: async (input: CreateToDoDTO) => {
    const { data: newToDo } = await api.request<ToDoItem>({
      url: '/todos',
      method: 'POST',
      data: input,
    });

    return newToDo;
  },
  update: async (id: number, input: UpdateToDoDTO) => {
    const { data: updatedToDo } = await api.request<ToDoItem>({
      url: `/todos/${id}`,
      method: 'PATCH',
      data: input,
    });

    return updatedToDo;
  },
  delete: async (id: number) => {
    const { data: deletedToDo } = await api.request<ToDoItem>({
      url: `/todos/${id}`,
      method: 'DELETE',
    });

    return deletedToDo;
  },
};

export default todoAPI;
