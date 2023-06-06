import style from './Loader.module.css';
import { ImSpinner9 } from 'react-icons/im';

const Loader = () => {
  return (
    <div className={style.container}>
      <ImSpinner9 size={121} color="#DBE2EF" className={style.loader} />
    </div>
  );
};

export default Loader;
