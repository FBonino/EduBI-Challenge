import todoAPI from '../../apis/todos.api';
import { ToDoCreateInput } from '../../types/todos.types';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { ToDoItem } from '../../types/todos.types';
import style from './SearchBar.module.css';

type Params = {
  todos: ToDoItem[];
  setTodos: Dispatch<SetStateAction<ToDoItem[]>>;
};

const SearchBar = ({ todos, setTodos }: Params) => {
  const createToDo = async (input: ToDoCreateInput) => {
    const newToDo = await todoAPI.create(input);
    setTodos([...todos, newToDo]);
  };

  const filterToDos = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={filterToDos}>
        <input className={style.search} type="submit" value="🔍" />
        <input className={style.input} placeholder="Filter..." />
      </form>
      <button
        className={style.add}
        onClick={() => createToDo({ title: 'test2' })}
      >
        New
      </button>
    </div>
  );
};

export default SearchBar;
