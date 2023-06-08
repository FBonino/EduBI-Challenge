import ToDo from '../ToDo/ToDo';
import style from './ToDos.module.css';
import todoAPI from '../../apis/todos.api';
import { Dispatch, SetStateAction } from 'react';
import { ToDoItem } from '../../types/todos.types';
import { UpdateToDoDTO } from '../../dtos/todos.dtos';

type Params = {
  todos: ToDoItem[];
  setTodos: Dispatch<SetStateAction<ToDoItem[]>>;
};

const ToDos = ({ todos, setTodos }: Params) => {
  const updateToDo = async (id: number, input: UpdateToDoDTO) => {
    const updatedToDo = await todoAPI.update(id, input);
    setTodos(todos.map((todo) => (todo.id === id ? updatedToDo : todo)));
  };

  const deleteToDo = async (id: number) => {
    await todoAPI.delete(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={style.container}>
      <div className={style.titles}>
        <p className={style.title}> ID </p>
        <p className={style.title}> Title </p>
        <p className={style.title}> Done </p>
        <p className={style.title}> Edit / Delete </p>
      </div>
      <div className={style.todos}>
        {todos.map((todo: ToDoItem) => (
          <ToDo
            key={todo.id}
            todo={todo}
            updateToDo={updateToDo}
            deleteToDo={deleteToDo}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDos;
