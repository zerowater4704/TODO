import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Task {
  _id: string;
  isCompleted: boolean;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("トークンがありません。ログインしてください。");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/post/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("タスクの取得に失敗しました。", error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  const token = localStorage.getItem("token");

  if (!token) {
    return <p>ログインしてください</p>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const completedTaskCount = tasks.filter((task) => task.isCompleted).length;
  const incompleteTaskCount = tasks.filter((task) => !task.isCompleted).length;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-500 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-white text-xl font-bold mb-4">未完了タスク</h3>
          <p className="text-5xl font-semibold text-white mb-6">
            {incompleteTaskCount}
          </p>
          <Link
            to="/incomplete-tasks"
            className="bg-white text-blue-500 py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-blue-700 hover:text-white"
          >
            未完了タスクを見る
          </Link>
        </div>

        <div className="bg-green-500 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-white text-xl font-bold mb-4">完了済みタスク</h3>
          <p className="text-5xl font-semibold text-white mb-6">
            {completedTaskCount}
          </p>
          <Link
            to="/complete-tasks"
            className="bg-white text-green-500 py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-green-700 hover:text-white"
          >
            完了タスクを見る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
