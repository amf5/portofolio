import axiosInstance from './axiosConfig';

// ===== AUTH ROUTES =====

// 1. Login
export const login = async (email, password) => {
  const response = await axiosInstance.post('/login', { email, password });
  return response.data;
};

// 2. Resend Code
export const resendCode = async (email) => {
  const response = await axiosInstance.post('/resend-code', { email });
  return response.data;
};

// 3. Forgot Password
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post('/forgot-password', { email });
  return response.data;
};

// 4. Verify OTP (send-token-otp)
export const verifyOTP = async (email, code) => {
  const response = await axiosInstance.post('/send-token-otp', { email, code });
  return response.data;
};

// 5. Change Password (with OTP token in header)
export const changePassword = async (password) => {
  const otpToken = localStorage.getItem('otpToken');
  const response = await axiosInstance.patch('/change-Password', 
    { password },
    {
      headers: {
        Authorization: `Bearer ${otpToken}`
      }
    }
  );
  return response.data;
};

// 6. Confirm Old Password (authenticated)
export const confirmOldPassword = async (password) => {
  const response = await axiosInstance.post('/confirm-Password', { password });
  return response.data;
};

// 7. Get Access Token
export const getAccessToken = async (refreshToken) => {
  const response = await axiosInstance.post('/access-token', { refreshToken });
  return response.data;
};

// 8. Logout
export const logout = async () => {
  const response = await axiosInstance.post('/logout');
  return response.data;
};