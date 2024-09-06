import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/post", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("タスクの取得に失敗しました:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">タスク一覧</h1>
      <ul className="space-y-6">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {task.title}
            </h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <p className="text-sm font-medium mb-4">
              ステータス:{" "}
              <span
                className={`${
                  task.isCompleted ? "text-green-500" : "text-red-500"
                } font-bold`}
              >
                {task.isCompleted ? "完了" : "未完了"}
              </span>
            </p>
            <Link
              to={`/task/${task._id}`}
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-blue-700"
            >
              詳細を見る
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
