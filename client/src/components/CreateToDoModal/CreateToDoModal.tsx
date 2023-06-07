import style from './CreateToDoModal.module.css';

const CreateToDoModal = () => {
  return (
    <>
      <div className={style.background} />
      <form>
        <div>
          <label> Title </label>
          <input />
        </div>
        <div>
          <label> Description </label>
          <input />
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
