import styles from "./LoginController.module.css";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { loginUser } from "../../services/authService";

function LoginController({
  username,
  password,
  onLoginSuccess,
  onLoginError,
}) {
  // States for button animation and loading
  const [animateButton, setAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // validate login with backend API
  async function validateLogin() {
    if (!username || !password) {
      onLoginError("请填写所有字段");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await loginUser(username, password);
      
      if (response.success) {
        onLoginSuccess({
          userId: response.data.userId,
          username: response.data.username,
          role: response.data.role,
        });
      } else {
        onLoginError(response.error || "登录失败");
      }
    } catch (error) {
      console.error("Login error:", error);
      onLoginError("登录失败，请重试");
    } finally {
      setIsLoading(false);
    }
  }

  // Button Click Handler
  function handleClick() {
    if (isLoading) return; // Prevent multiple clicks during loading
    
    setAnimate(true);
    // Repeating our animation after 300ms
    setTimeout(() => setAnimate(false), 300);

    // animate then validate
    validateLogin();
  }

  return (
    <button
      className={`${styles.loginButton} ${animateButton ? styles.clicked : ""} ${isLoading ? styles.loading : ""}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className={styles.spinner}></div>
      ) : (
        <FaArrowRightLong className={styles.rightArrow} />
      )}
    </button>
  );
}

export default LoginController;
