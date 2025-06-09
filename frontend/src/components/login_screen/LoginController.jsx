import styles from "./LoginController.module.css";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

function LoginController({
  studentID,
  password,
  onLoginSuccess,
  onLoginError,
}) {
  // Fake login
  const validID = "lt";
  const validPassword = "123";

  // validate login
  // final code will send to backend api
  function validateLogin() {
    // console.log(studentID)
    // console.log(password)
    if (studentID === validID && password === validPassword) {
      onLoginSuccess();
    } else {
      onLoginError("Invalid StudentID or Password!");
    }
  }

  // States for button animation
  const [animateButton, setAnimate] = useState(false);

  // Button Click Handler
  function handleClick() {
    setAnimate(true);
    // Repeating our animation after 300ms
    setTimeout(() => setAnimate(false), 300);

    // animate then validate (ha)
    validateLogin();
  }

  return (
    <button
      className={`${styles.loginButton} ${animateButton ? styles.clicked : ""}`}
      onClick={handleClick}
    >
      <FaArrowRightLong className={styles.rightArrow} />
    </button>
  );
}

export default LoginController;
