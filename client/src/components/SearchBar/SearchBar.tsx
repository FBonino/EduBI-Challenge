import todoAPI from '../../apis/todos.api';
import style from './SearchBar.module.css';
import { ToDoItem } from '../../types/todos.types';
import { CreateToDoDTO } from '../../dtos/todos.dtos';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import CreateToDoModal from '../CreateToDoModal/CreateToDoModal';

type Params = {
  todos: ToDoItem[];
  setTodos: Dispatch<SetStateAction<ToDoItem[]>>;
};

const SearchBar = ({ todos, setTodos }: Params) => {
  const [showModal, setShowModal] = useState(false);
  const [newToDo, setNewToDo] = useState<CreateToDoDTO>({
    title: '',
    description: '',
  });

  const createToDo = async (input: CreateToDoDTO) => {
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
      <button className={style.add} onClick={() => setShowModal(true)}>
        New
      </button>
      {showModal && (
        <CreateToDoModal
          handleClose={() => setShowModal(false)}
          newToDo={newToDo}
          setNewToDo={setNewToDo}
          createToDo={createToDo}
        />
      )}
    </div>
  );
};

export default SearchBar;
