import style from './ToDo.module.css';
import { ToDoItem } from '../../types/todos.types';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const ToDo = ({ id, title, done }: ToDoItem) => {
  return (
    <div className={style.container}>
      <div className={style.buttons}>
        <button className={style.button}>
          <AiFillEdit size={20} />
        </button>
        <button className={style.button}>
          <AiFillDelete size={20} />
        </button>
      </div>
      <div className={style.content}>
        <p className={style.id}> {id} </p>
        <p className={style.title}> {title} </p>
        <input className={style.done} type="checkbox" checked={done} />
      </div>
    </div>
  );
};

export default ToDo;
