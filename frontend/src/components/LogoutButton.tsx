import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  setIsAuthenticated: (auth: boolean) => void;
  children: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  setIsAuthenticated,
  children,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <li>
      <button onClick={handleLogout} className="text-white hover:text-gray-300">
        {children}
      </button>
    </li>
  );
};

export default LogoutButton;
