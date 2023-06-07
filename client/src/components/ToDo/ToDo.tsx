import style from './ToDo.module.css';
import { ToDoItem, ToDoUpdateInput } from '../../types/todos.types';
import { AiFillEdit, AiFillDelete, AiFillSave } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useState } from 'react';

type Params = {
  todo: ToDoItem;
  updateToDo: (id: number, input: ToDoUpdateInput) => Promise<void>;
  deleteToDo: (id: number) => Promise<void>;
};

const ToDo = ({ todo, updateToDo, deleteToDo }: Params) => {
  const [isEditing, setIsEditing] = useState(false);

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
      <p className={style.id}> {todo.id} </p>
      <input className={style.title} value={todo.title} disabled={!isEditing} />
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
  );
};

export default ToDo;
