import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

const CompleteTasks: React.FC = () => {
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
        const completeTasks = response.data.filter(
          (task: Task) => task.isCompleted
        );
        setTasks(completeTasks);
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

  return (
    <div>
      <h1>完了タスク一覧</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <Link to={`/task/${task._id}`}>詳細</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompleteTasks;
