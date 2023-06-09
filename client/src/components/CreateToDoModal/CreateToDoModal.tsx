import style from './CreateToDoModal.module.css';
import { CreateToDoDTO } from '../../dtos/todos.dtos';
import { useState, SyntheticEvent, ChangeEvent } from 'react';

type Params = {
  handleClose: () => void;
  createToDo: (createToDoDTO: CreateToDoDTO) => void;
};

const CreateToDoModal = ({ handleClose, createToDo }: Params) => {
  const [newToDo, setNewToDo] = useState<CreateToDoDTO>({
    title: '',
    description: '',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewToDo({ ...newToDo, [event.target.name]: event.target.value });
  };

  const handleCreateToDo = async (event: SyntheticEvent) => {
    event.preventDefault();
    await createToDo(newToDo);
    setNewToDo({ title: '', description: '' });
    handleClose();
  };

  return (
    <>
      <div className={style.background} onClick={handleClose} />
      <form
        className={style.form}
        onSubmit={handleCreateToDo}
        autoComplete="off"
      >
        <h2 className={style.title}> New ToDo </h2>
        <div className={style.field}>
          <label className={style.label}> Title </label>
          <input
            className={style.input}
            name="title"
            value={newToDo.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.field}>
          <label className={style.label}> Description </label>
          <textarea
            className={style.input}
            name="description"
            value={newToDo.description}
            onChange={handleChange}
            required
            rows={5}
          />
        </div>
        <input className={style.submit} type="submit" value="Create" />
      </form>
    </>
  );
};

export default CreateToDoModal;
