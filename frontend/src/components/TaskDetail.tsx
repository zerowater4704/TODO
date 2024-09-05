import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

const TaskDetail: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/post/${_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTask(response.data);
        setIsCompleted(response.data.isCompleted);
      } catch (error) {
        console.error("タスクの取得に失敗しました。", error);
      }
    };

    fetchTask();
  }, [_id]);

  const handleStatusChange = async () => {
    try {
      const updateStatus = !isCompleted;
      await axios.put(
        `http://localhost:3000/api/post/${_id}`,
        {
          isCompleted: updateStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsCompleted(updateStatus);
      if (updateStatus) {
        navigate("/complete-tasks");
      } else {
        navigate("/incomplete-tasks");
      }
    } catch (error) {
      console.error("タスクの更新に失敗しました。", error);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>ステータス: {task.isCompleted ? "完了" : "未完了"}</p>
      <button onClick={handleStatusChange}>
        {isCompleted ? "未完了にする" : "完了にする"}
      </button>
    </div>
  );
};

export default TaskDetail;
