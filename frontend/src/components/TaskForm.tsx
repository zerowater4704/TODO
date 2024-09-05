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
    <form onSubmit={handelSubmit}>
      <div>
        <label>タイトル:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>説明:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">タスク追加</button>
    </form>
  );
};

export default TaskForm;
