import style from './CreateToDoModal.module.css';
import { CreateToDoDTO } from '../../dtos/todos.dtos';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

type Params = {
  handleClose: () => void;
  newToDo: CreateToDoDTO;
  setNewToDo: Dispatch<SetStateAction<CreateToDoDTO>>;
  createToDo: (createToDoDTO: CreateToDoDTO) => void;
};

const CreateToDoModal = ({
  handleClose,
  newToDo,
  setNewToDo,
  createToDo,
}: Params) => {
  // const handleChange = (event: SyntheticEvent) => setNewToDo({ ...newToDo, [event.target.name]: event.target.value });

  const handleCreateToDo = (event: SyntheticEvent) => {
    event.preventDefault();
    createToDo(newToDo);
    setNewToDo({ title: '', description: '' });
  };

  return (
    <>
      <div className={style.background} onClick={handleClose} />
      <form className={style.form} onSubmit={handleCreateToDo}>
        <div>
          <label> Title </label>
          <input name="title" value={newToDo.title} />
        </div>
        <div>
          <label> Description </label>
          <input name="description" value={newToDo.description} />
        </div>
        <div>
          <label> Done </label>
          <input type="checkbox" />
        </div>
        <input type="submit" value="Add" />
      </form>
    </>
  );
};

export default CreateToDoModal;
