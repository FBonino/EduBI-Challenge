import todoAPI from '../../apis/todos.api';
import { useState, useEffect } from 'react';
import ToDos from '../../components/ToDos/ToDos';
import Loader from '../../components/Loader/Loader';
import NewButton from '../../components/NewButton/NewButton';
import { ToDoItem } from '../../types/todos.types';
import style from './HomeLayout.module.css';
import useBooleanState from '../../hooks/useBooleanState';
import Error from '../../components/Error/Error';

const HomeLayout = () => {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [hasError, setHasError, setHasNoError] = useBooleanState();
  const [isLoading, setIsLoading, setIsNotLoading] = useBooleanState();

  useEffect(() => {
    fetchToDos();
  }, []);

  const fetchToDos = async () => {
    setIsLoading();
    try {
      const allToDos = await todoAPI.findAll();
      setTodos(allToDos);
      setHasNoError();
    } catch (err) {
      setHasError();
    } finally {
      setIsNotLoading();
    }
  };

  return (
    <div className={style.container}>
      <h1> EduBI Challenge </h1>
      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <Error />
      ) : (
        <div className={style.content}>
          <NewButton todos={todos} setTodos={setTodos} />
          <ToDos todos={todos} setTodos={setTodos} />
        </div>
      )}
    </div>
  );
};

export default HomeLayout;
