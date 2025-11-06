import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import jwtDecode from "jwt-decode";

const REGION = import.meta.env.VITE_COGNITO_REGION;
const USER_POOL_ID = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;

const pool = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
});

// ---------- helpers ----------
const saveSession = (session) => {
  const idToken = session.getIdToken().getJwtToken();
  const accessToken = session.getAccessToken().getJwtToken();
  const refreshToken = session.getRefreshToken()?.getToken();

  const decoded = jwtDecode(idToken);
  const groups = decoded["cognito:groups"] || [];
const role = groups.includes("admins") ? "admin" : "student";
  localStorage.setItem("idToken", idToken);
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  // Use sub & email for your UI
  localStorage.setItem("userId", decoded.sub || "");
  localStorage.setItem("username", decoded.email || decoded["cognito:username"] || "");
  
  localStorage.setItem("userRole", role);
};

export const getIdToken = () => localStorage.getItem("idToken") || "";

export const isTokenValid = () => {
  const idToken = localStorage.getItem("idToken");
  if (!idToken) return false;
  try {
    const { exp } = jwtDecode(idToken);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// ---------- public API for your UI ----------

// Signup with email+password (Cognito will email a code)
export const registerUser = (email, password) =>
  new Promise((resolve, reject) => {
    pool.signUp(email, password, [], null, (err, result) => {
      if (err) return resolve({ success: false, error: err.message || String(err) });
      resolve({
        success: true,
        data: {
          username: result.user.getUsername(),
        },
      });
    });
  });

// Confirm email with the code Cognito sent
export const confirmUser = (email, code) =>
  new Promise((resolve) => {
    const user = new CognitoUser({ Username: email, Pool: pool });
    user.confirmRegistration(code, true, (err, _res) => {
      if (err) return resolve({ success: false, error: err.message || String(err) });
      resolve({ success: true });
    });
  });

// Login (SRP) – no backend endpoint, gets tokens directly
export const loginUser = (email, password) =>
  new Promise((resolve) => {
    const user = new CognitoUser({ Username: email, Pool: pool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        saveSession(session);
        resolve({
          success: true,
          data: {
            userId: localStorage.getItem("userId"),
            username: localStorage.getItem("username"),
            role: localStorage.getItem("userRole"),
          },
        });
      },
      onFailure: (err) => resolve({ success: false, error: err.message || String(err) }),
      newPasswordRequired: () => resolve({ success: false, error: "New password required." }),
    });
  });

export const logoutUser = () => {
  const current = pool.getCurrentUser();
  if (current) current.signOut();
  localStorage.removeItem("idToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("userRole");
};

export const checkAuthStatus = () => {
  if (!isTokenValid()) return { isAuthenticated: false, user: null };
  return {
    isAuthenticated: true,
    user: {
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("userRole") || "user",
    },
  };
};
  
