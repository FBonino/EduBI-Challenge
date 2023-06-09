import todoAPI from '../../apis/todos.api';
import style from './NewButton.module.css';
import { ToDoItem } from '../../types/todos.types';
import { CreateToDoDTO } from '../../dtos/todos.dtos';
import useBooleanState from '../../hooks/useBooleanState';
import { Dispatch, SetStateAction } from 'react';
import CreateToDoModal from '../CreateToDoModal/CreateToDoModal';

type Params = {
  todos: ToDoItem[];
  setTodos: Dispatch<SetStateAction<ToDoItem[]>>;
};

const NewButton = ({ todos, setTodos }: Params) => {
  const [showModal, openModal, closeModal] = useBooleanState();

  const createToDo = async (createToDoDTO: CreateToDoDTO) => {
    try {
      const newToDo = await todoAPI.create(createToDoDTO);
      setTodos([...todos, newToDo]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.container}>
      <button className={style.add} onClick={openModal}>
        New
      </button>
      {showModal && (
        <CreateToDoModal handleClose={closeModal} createToDo={createToDo} />
      )}
    </div>
  );
};

export default NewButton;
