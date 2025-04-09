// components/TodoItem.jsx
import { Link } from 'react-router-dom';
import styles from './TodoItem.module.css';

export default function TodoItem({ todo }) {
  return (
    <li className={styles.item}>
      <Link to={`/tasks/${todo.id}`} className={styles.link}>
        {todo.title} — <em>{todo.status}</em>
      </Link>
    </li>
  );
}