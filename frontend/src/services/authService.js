// API base URL
const API_BASE_URL = '${API_BASE_URL}/api/auth';

/**
 * 用户注册
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<Object>} - 注册结果
 */
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: {
          userId: data.userId,
          username: data.username,
          role: data.role || 'user',
        },
      };
    } else {
      return {
        success: false,
        error: data.error || 'Registration failed',
      };
    }
  } catch (error) {
    console.error('Registration API error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
};

/**
 * 用户登录
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<Object>} - 登录结果
 */
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: {
          userId: data.userId,
          username: data.username,
          role: data.role || 'user',
        },
      };
    } else {
      return {
        success: false,
        error: data.error || 'Login failed',
      };
    }
  } catch (error) {
    console.error('Login API error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
};

/**
 * 获取用户信息
 * @param {string} userId - 用户ID
 * @returns {Promise<Object>} - 用户信息
 */
export const getUserInfo = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: {
          userId: data.userId,
          username: data.username,
          role: data.role,
        },
      };
    } else {
      return {
        success: false,
        error: data.error || 'Failed to get user info',
      };
    }
  } catch (error) {
    console.error('Get user info API error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
};

/**
 * 检查用户是否已登录
 * @returns {Object} - 登录状态和用户信息
 */
export const checkAuthStatus = () => {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const userRole = localStorage.getItem('userRole');

  if (userId && username) {
    return {
      isAuthenticated: true,
      user: {
        userId: parseInt(userId),
        username,
        role: userRole,
      },
    };
  }

  return {
    isAuthenticated: false,
    user: null,
  };
};

/**
 * 用户登出
 */
export const logoutUser = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('userRole');
}; 