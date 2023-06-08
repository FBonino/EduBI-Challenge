import Swal from 'sweetalert2';
import { useState } from 'react';
import style from './ToDo.module.css';
import { MdExpandMore } from 'react-icons/md';
import { ToDoItem } from '../../types/todos.types';
import { UpdateToDoDTO } from '../../dtos/todos.dtos';
import { AiFillEdit, AiFillDelete, AiFillSave } from 'react-icons/ai';

type Params = {
  todo: ToDoItem;
  updateToDo: (id: number, input: UpdateToDoDTO) => Promise<void>;
  deleteToDo: (id: number) => Promise<void>;
};

const ToDo = ({ todo, updateToDo, deleteToDo }: Params) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onDelete = () => {
    Swal.fire({
      title: 'Are you sure you want to delete this ToDo?',
      text: "This can't be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteToDo(todo.id);
      }
    });
  };

  const onUpdate = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.basic} onClick={() => setIsFocused(false)}>
        <p className={style.id}> {todo.id} </p>
        <input
          className={style.title}
          value={todo.title}
          disabled={!isEditing}
        />
        <input
          className={style.done}
          type="checkbox"
          checked={todo.done}
          onChange={() => updateToDo(todo.id, { done: !todo.done })}
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
      {/* <div className={style.focused}> */}
      {isFocused ? (
        <div className={style.description} onClick={() => setIsFocused(false)}>
          <p> Description </p>
          <textarea
            value={todo.description}
            disabled={!isEditing}
            rows={5}
            cols={30}
          />
        </div>
      ) : (
        <div className={style.more} onClick={() => setIsFocused(true)}>
          <MdExpandMore />
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default ToDo;
