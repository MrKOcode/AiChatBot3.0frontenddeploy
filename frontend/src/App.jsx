import "./App.css";
import React from "react";
import LoginScreen from "./components/login_screen/LoginScreen";
import Dashboard from "./components/dashboard/Dashboard";

import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  // user login state tracker
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // login handler
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
