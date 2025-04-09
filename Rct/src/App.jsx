import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <Router>
        <nav style={navStyle}>
          <Link to="/tasks" style={linkStyle}>📋 Task Manager</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TodoListPage />} />
          <Route path="/tasks/:id" element={<TodoDetailPage />} />
        </Routes>
      </Router>
    </TodoProvider>
  );
}

export default App;

const navStyle = {
  background: '#333',
  color: 'white',
  padding: '1rem',
  textAlign: 'center'
};

const linkStyle = {
  color: 'white',
  fontWeight: 'bold',
  fontSize: '20px',
  textDecoration: 'none'
};
