import { useParams, useNavigate } from 'react-router-dom';
import { useTodos } from '../context/TodoContext';
import styles from './TodoDetailPage.module.css';
import { useState } from 'react';

export default function TodoDetailPage() {
  const { id } = useParams();
  const { todos, updateTodo, deleteTodo } = useTodos();
  ///console.log(todos)
  const todo = todos.find(t => t.id === +id);
  const navigate = useNavigate();
  const [updatedTodo, setUpdatedTodo] = useState("")

  const handleChange = (field, value) => {
    const updated = { ...todo, [field]: value };
    setUpdatedTodo(updated);
    updateTodo(updatedTodo)
    if (field === 'status' || field === 'title') {
      alert('Todo updated successfully!');
    }
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    alert('Todo deleted!');
    navigate('/tasks');
  };

  if (!todo) return <p>Todo not found</p>;

  return (
    <div className={styles.container}>
      <h2>Edit Todo</h2>
      <label>Title: <input value={todo.title} onChange={e => handleChange('title', e.target.value)} /></label>
      <label>Description: <textarea value={todo.description} onChange={e => handleChange('description', e.target.value)} /></label>
      <label>Status:
        <select value={todo.status} onChange={e => handleChange('status', e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <div className={styles.buttons}>
        <button onClick={() => navigate('/tasks')}>Back</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}