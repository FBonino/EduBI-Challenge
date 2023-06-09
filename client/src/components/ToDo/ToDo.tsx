import Swal from 'sweetalert2';
import style from './ToDo.module.css';
import { ToDoItem } from '../../types/todos.types';
import { UpdateToDoDTO } from '../../dtos/todos.dtos';
import useBooleanState from '../../hooks/useBooleanState';
import { AiFillEdit, AiFillDelete, AiFillSave } from 'react-icons/ai';
import { useState, ChangeEvent } from 'react';

type Params = {
  todo: ToDoItem;
  updateToDo: (id: number, input: UpdateToDoDTO) => Promise<void>;
  deleteToDo: (id: number) => Promise<void>;
};

const ToDo = ({ todo, updateToDo, deleteToDo }: Params) => {
  const [isEditing, setIsEditing, setIsNotEditing] = useBooleanState();
  const [isFocused, setIsFocused, setIsNotFocused] = useBooleanState();
  const [state, setState] = useState({
    title: todo.title,
    description: todo.description,
    done: todo.done,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onDelete = () => {
    Swal.fire({
      title: 'Are you sure you want to delete this ToDo?',
      text: "This can't be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteToDo(todo.id);
      }
    });
  };

  const onUpdate = async () => {
    if (!isEditing) {
      setIsEditing();
    } else {
      await updateToDo(todo.id, state);
      setIsNotEditing();
    }
  };

  return (
    <div
      className={style.container}
      onMouseEnter={setIsFocused}
      onMouseLeave={() => setTimeout(setIsNotFocused, 100)}
    >
      <div className={style.basic}>
        <p className={style.id}> {todo.id} </p>
        <input
          className={style.title}
          name="title"
          value={state.title}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <input
          className={style.done}
          name="done"
          type="checkbox"
          checked={state.done}
          onChange={({ target }) =>
            setState({ ...state, [target.name]: target.checked })
          }
          disabled={!isEditing}
        />
        <div className={style.buttons}>
          <button className={style.button} onClick={onUpdate}>
            {isEditing ? <AiFillSave size={20} /> : <AiFillEdit size={20} />}
          </button>
          <button className={style.button} onClick={onDelete}>
            <AiFillDelete size={20} />
          </button>
        </div>
      </div>
      <div className={isFocused ? style.description : style.hidden}>
        <p> Description </p>
        <textarea
          name="description"
          value={state.description}
          onChange={handleChange}
          disabled={!isEditing}
          rows={5}
          cols={30}
        />
      </div>
    </div>
  );
};

export default ToDo;
