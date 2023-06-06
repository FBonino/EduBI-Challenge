import todoAPI from '../apis/todos.api';
import { useState, useEffect } from 'react';
import ToDos from '../components/ToDos/ToDos';
import Loader from '../components/Loader/Loader';
import SearchBar from '../components/SearchBar/SearchBar';
import { ToDoItem } from '../types/todos.types';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<ToDoItem[]>([]);

  useEffect(() => {
    setIsLoading(true);
    todoAPI.findAll().then((allToDos) => {
      setTodos(allToDos);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h1> EduBI Challenge </h1>
      <SearchBar todos={todos} setTodos={setTodos} />
      {isLoading ? <Loader /> : <ToDos todos={todos} setTodos={setTodos} />}
    </div>
  );
};

export default HomePage;
