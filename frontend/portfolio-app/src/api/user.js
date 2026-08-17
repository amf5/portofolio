import axiosInstance from './axiosConfig';

// ===== USER ROUTES =====

// 1. Get user data (authenticated)
export const getUserData = async () => {
  try {
    const response = await axiosInstance.get('/user-data');
    return response.data;
  } catch (error) {
    console.error('Get user data error:', error);
    return error.response?.data || { status: 500, success: false, message: 'Failed to get user data' };
  }
};

// 2. Get public portfolio (NO auth needed)
export const getUserPortfolio = async () => {
  try {
    const response = await axiosInstance.get('/user-portofoli');
    return response.data;
  } catch (error) {
    console.error('Get user portfolio error:', error);
    return error.response?.data || { status: 500, success: false, message: 'Failed to get portfolio' };
  }
};

// 3. Update user (authenticated)
export const updateUser = async (data) => {
  try {
    const response = await axiosInstance.patch('/user-update', data);
    return response.data;
  } catch (error) {
    console.error('Update user error:', error);
    // Return the error response so the component can handle it
    return error.response?.data || { 
      status: error.response?.status || 500, 
      success: false, 
      message: error.response?.data?.message || 'Failed to update user' 
    };
  }
};

// 4. Remove skills (authenticated)
export const removeSkills = async (skills) => {
  try {
    const response = await axiosInstance.patch('/user-remove-skills', { skills });
    return response.data;
  } catch (error) {
    console.error('Remove skills error:', error);
    return error.response?.data || { status: 500, success: false, message: 'Failed to remove skills' };
  }
};