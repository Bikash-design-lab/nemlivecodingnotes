import { useRef, useEffect, useState } from "react";
import { useTodos } from "../context/TodoContext";
import styles from './AddTodo.module.css';

const AddTodo = () => {
  const inputRef = useRef();
  const [text, setText] = useState("");
  const { addTodo } = useTodos();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button className={styles.button} type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
