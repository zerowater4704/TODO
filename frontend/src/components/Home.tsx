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
      try {
        const response = await axios.get("http://localhost:3000/api/post/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const completedTaskCount = tasks.filter((task) => task.isCompleted).length;
  const incompleteTaskCount = tasks.filter((task) => !task.isCompleted).length;

  return (
    <div>
      <h1>ホーム画面</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-500 p-4 rounded">
          <h3 className="text-white">未完了タスク</h3>
          <p className="text-3xl text-white">{incompleteTaskCount}</p>
          <Link to="/incomplete-tasks" className="text-white underline">
            未完了タスクを見る
          </Link>
        </div>
        <div className="bg-green-500 p-4 rounded">
          <h3 className="text-white">完了済みタスク</h3>
          <p className="text-3xl text-white">{completedTaskCount}</p>
          <Link to="/complete-tasks" className="text-white underline">
            完了タスクを見る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
