import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import IncompleteTasks from "./components/IncompleteTasks";
import CompleteTasks from "./components/CompleteTasks";
import LogoutButton from "./components/LogoutButton";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
            <Link to="/create" className="text-white hover:text-gray-300">
              タスク作成
            </Link>
          </li>
          <li>
            <Link
              to="/incomplete-tasks"
              className="text-white hover:text-gray-300"
            >
              未完了タスク
            </Link>
          </li>
          <li>
            <Link
              to="/complete-tasks"
              className="text-white hover:text-gray-300"
            >
              完了タスク
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
            <LogoutButton setIsAuthenticated={setIsAuthenticated}>
              ログアウト
            </LogoutButton>
          )}
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/incomplete-tasks"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <IncompleteTasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/complete-tasks"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CompleteTasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <TaskForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/task/:_id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <TaskDetail />
            </PrivateRoute>
          }
        />
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

export default App;
