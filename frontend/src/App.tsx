import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              ホーム
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="text-white hover:text-gray-300">
              タスク一覧
            </Link>
          </li>
          <li>
            <Link to="/create" className="text-white hover:text-gray-300">
              タスク作成
            </Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/signup" className="text-white hover:text-gray-300">
                  会員登録
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">
                  ログイン
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                ログアウト
              </button>
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
  // ここでタスクのカウントを取得するロジックを追加
  const incompleteTaskCount = 5; // ダミーデータ
  const completedTaskCount = 10; // ダミーデータ

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ホームへようこそ</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-500 p-4 rounded">
          <h3 className="text-white">未完了タスク</h3>
          <p className="text-3xl text-white">{incompleteTaskCount}</p>
        </div>
        <div className="bg-green-500 p-4 rounded">
          <h3 className="text-white">完了済みタスク</h3>
          <p className="text-3xl text-white">{completedTaskCount}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
