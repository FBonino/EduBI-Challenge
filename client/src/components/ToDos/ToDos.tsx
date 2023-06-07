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
