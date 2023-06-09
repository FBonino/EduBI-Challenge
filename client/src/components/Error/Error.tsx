import style from './Error.module.css';

const Error = () => {
  return (
    <div className={style.container}>
      <h2> Something went wrong! </h2>
      <h3> Error while fetching ToDos, try again later </h3>
    </div>
  );
};

export default Error;
