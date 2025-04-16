import { createContext, useContext, useEffect, useRef, useState } from 'react';

const TodoContext = createContext(); /// create context

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const idRef = useRef(1);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('todos'))||[];
    setTodos(stored);
    if (stored.length > 0) {
      idRef.current = Math.max(...todos.map(todo => todo.id)) + 1;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    const newTodo = {
      id: idRef.current++,
      title,
      description: '',
      status: 'pending'
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(prev => prev.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);