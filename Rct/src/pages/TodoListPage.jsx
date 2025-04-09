import { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from '../components/TodoItem';
import styles from './TodoListPage.module.css';

export default function TodoListPage() {
  const { todos, addTodo } = useTodos();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Todo List</h2>
      <div className={styles.inputRow}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="New Todo" />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul className={styles.list}>
        {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    </div>
  );
}