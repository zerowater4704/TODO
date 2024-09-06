import React, { useState } from "react";
import axios from "axios";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newTask = { title, description };
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/api/post/", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("タスクが作成できました！");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("タスク追加に失敗しました。", error);
    }
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">タイトル:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="タスクのタイトルを入力してください"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">説明:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="タスクの説明を入力してください"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        タスク追加
      </button>
    </form>
  );
};

export default TaskForm;
