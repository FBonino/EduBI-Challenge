import todoAPI from '../../apis/todos.api';
import { ToDoCreateInput } from '../../types/todos.types';
import { Dispatch, SetStateAction } from 'react';
import { ToDoItem } from '../../types/todos.types';

type Params = {
  todos: ToDoItem[];
  setTodos: Dispatch<SetStateAction<ToDoItem[]>>;
};

const SearchBar = ({ todos, setTodos }: Params) => {
  const createToDo = async (input: ToDoCreateInput) => {
    const newToDo = await todoAPI.create(input);
    setTodos([...todos, newToDo]);
  };

  return (
    <div>
      <input />
      <button onClick={() => createToDo({ title: 'test2' })}> + </button>
    </div>
  );
};

export default SearchBar;
