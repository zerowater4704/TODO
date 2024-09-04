import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

const TaskDetail: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/${_id}`
        );
        setTask(response.data);
      } catch (error) {
        console.error("タスクの取得に失敗しました。", error);
      }
    };

    fetchTask();
  }, [_id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>ステータス: {task.isCompleted ? "完了" : "未完了"}</p>
    </div>
  );
};

export default TaskDetail;
