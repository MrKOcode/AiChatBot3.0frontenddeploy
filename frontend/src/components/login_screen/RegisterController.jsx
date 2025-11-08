import styles from "./LoginScreen.module.css";
import React from "react";
import { registerUser } from "../../services/authService";

function RegisterController({ 
  username, 
  password, 
  confirmPassword, 
  onRegisterSuccess, 
  onRegisterError 
}) {
  
  const handleRegister = async () => {
    // 验证输入
    if (!username || !password || !confirmPassword) {
      onRegisterError("Please fill in all fields");
      return;
    }

    if (username.length < 3) {
      onRegisterError("User name must be at least 3 characters");
      return;
    }

    if (password.length < 6) {
      onRegisterError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      onRegisterError("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(username, password);
      
      if (response.success) {
        onRegisterSuccess({
          userId: response.data.userId,
          username: response.data.username,
          role: response.data.role || 'user'
        });
      } else {
        onRegisterError(response.error || "Registration failed" );
      }
    } catch (error) {
  // Log entire error object and readable fields
  console.error("Registration error:", error);
  if (error && error.error) {
    console.error("Cognito error message:", error.error);
  }
  if (error && error.message) {
    console.error("Cognito error message:", error.message);
  }
  onRegisterError(error.error || error.message || "An error occurred during registration.");
}
  };

  return (
    <div className={styles.loginButtonContainer}>
      <button 
        className={styles.loginButton} 
        onClick={handleRegister}
      >
        Enter
      </button>
    </div>
  );
}

export default RegisterController; 