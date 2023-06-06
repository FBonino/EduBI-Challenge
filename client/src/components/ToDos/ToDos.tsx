import ToDo from '../ToDo/ToDo';
import style from './ToDos.module.css';
import { Dispatch, SetStateAction } from 'react';
import { ToDoItem, ToDoUpdateInput } from '../../types/todos.types';
import todoAPI from '../../apis/todos.api';

type Params = {
  todos: ToDoItem[];
  setTodos: Dispatch<SetStateAction<ToDoItem[]>>;
};

const ToDos = ({ todos, setTodos }: Params) => {
  const updateToDo = async (id: number, input: ToDoUpdateInput) => {
    const updatedToDo = await todoAPI.update(id, input);
    setTodos(todos.map((todo) => (todo.id === id ? updatedToDo : todo)));
  };

  const deleteToDo = async (id: number) => {
    const deletedToDo = await todoAPI.delete(id);
    setTodos(todos.filter((todo) => todo.id !== deletedToDo.id));
  };

  return (
    <div className={style.container}>
      <div className={style.list}>
        {todos.map(({ id, title, done }: ToDoItem) => (
          <ToDo key={id} id={id} title={title} done={done} />
        ))}
      </div>
    </div>
  );
};

export default ToDos;
