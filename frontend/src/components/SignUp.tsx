import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handelSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/user/auth", {
        name,
        email,
        password,
      });
      setMessage("会員登録が成功しました！");
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      setMessage("会員登録に失敗しました。");
      console.error("エラー", setMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">会員登録</h1>
        <form onSubmit={handelSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
          >
            登録
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SignUp;
