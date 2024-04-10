import React, { useState, useEffect } from "react";
import "./Snackbar.css";

interface SnackbarProps {
  message: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div
      className={`snackbar ${isVisible && message.length > 0 ? "show" : ""}`}
    >
      <span className="message">{message}</span>
    </div>
  );
};

export default Snackbar;
