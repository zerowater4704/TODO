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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/post/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("タスクが削除されました。");
      navigate("/");
    } catch (error) {
      console.error("タスクの削除に失敗しました。", error);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-gray-800 flex-1 break-words">
          {task.title}
        </h1>
        <button
          onClick={handleDelete}
          className="py-2 px-4 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 ml-4"
        >
          削除
        </button>
      </div>
      <p className="text-gray-700 mb-4">{task.description}</p>

      <button
        onClick={handleStatusChange}
        className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors ${
          isCompleted
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isCompleted ? "未完了にする" : "完了にする"}
      </button>
    </div>
  );
};

export default TaskDetail;
