import api from '.';
import {
  ToDoItem,
  ToDoCreateInput,
  ToDoUpdateInput,
} from '../types/todos.types';

const todoAPI = {
  findAll: async () => {
    const { data: allToDos } = await api.request<ToDoItem[]>({
      url: '/todos',
      method: 'GET',
    });

    return allToDos;
  },
  create: async (input: ToDoCreateInput) => {
    const { data: newToDo } = await api.request<ToDoItem>({
      url: '/todos',
      method: 'POST',
      data: input,
    });

    return newToDo;
  },
  update: async (id: number, input: ToDoUpdateInput) => {
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
