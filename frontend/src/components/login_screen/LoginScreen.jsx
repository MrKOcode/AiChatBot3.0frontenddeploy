import styles from "./LoginScreen.module.css";
import logo from "../assets/website-icon.png";
import { useState } from "react";
import LoginController from "./LoginController";
import React from "react";

function LoginScreen({ onLoginSuccess }) {
  // States for input handling
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  // error handler
  const handleLoginError = (errorMessage) => {
    setLoginError(errorMessage);
  };

  return (
    <div className={styles.panelHandler}>
      <div className={styles.loginContainer}>
        {/* This div is for the login inputs */}
        <div className={styles.inputContainer}>
          <h1 className={styles.inputLabel}>LOGIN</h1>

          {/* Creating the input field for username */}
          {/* <label className={styles.inputLabel}>StudentID</label> */}
          <div className={styles.inputGroup}>
            <input
              className={styles.inputField}
              type="text"
              placeholder="StudentID"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
            />
          </div>

          {/* Creating the input field for the password */}
          {/* <label className={styles.inputLabel}>Password</label> */}
          <div className={styles.inputGroup}>
            <input
              className={styles.inputField}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Display incorrect password error */}
          <div className={styles.failedLogin}>
            {loginError && <p className={styles.errorMessage}>{loginError}</p>}
          </div>

          <LoginController
            studentID={studentID}
            password={password}
            onLoginSuccess={onLoginSuccess}
            onLoginError={handleLoginError}
          />
        </div>

        <div className={styles.welcomePanel}>
          <img src={logo} />
          <h1 className={styles.welcomeHeader}> Welcome!</h1>
          <p className={styles.subtext}>
            Please enter your Student ID and password!
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
