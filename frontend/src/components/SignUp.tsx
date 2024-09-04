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
    <div>
      <h1>会員登録</h1>
      <form onSubmit={handelSignUp}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
