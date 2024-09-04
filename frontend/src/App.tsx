import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">ホーム</Link>
          </li>
          <li>
            <Link to="/tasks">タスク一覧</Link>
          </li>
          <li>
            <Link to="/create">タスク作成</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/task/:_id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
};

const Home: React.FC = () => {
  return <h1>ホームへようこそ</h1>;
};

export default App;
