import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handelLogout = () => {
    setIsAuthenticated(false);
  };
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
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/signup">会員登録</Link>
              </li>
              <li>
                <Link to="/login">ログイン</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handelLogout}>ログアウト</button>
            </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/task/:_id" element={<TaskDetail />} />
        <Route
          path="/signup"
          element={<SignUp setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

const Home: React.FC = () => {
  return <h1>ホームへようこそ</h1>;
};

export default App;
