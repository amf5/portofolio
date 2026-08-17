import axiosInstance from './axiosConfig';

// 1. Create project (authenticated)
export const createProject = async (data) => {
  try {
    const response = await axiosInstance.post('/project-create', data);
    console.log('✅ Create project response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Create project error:', error);
    return error.response?.data || { 
      status: 500, 
      success: false, 
      message: 'Failed to create project' 
    };
  }
};

// 2. Get all projects (public)
export const getAllProjects = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/project-all?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Get all projects error:', error);
    return error.response?.data || { 
      status: 500, 
      success: false, 
      message: 'Failed to load projects',
      data: { projects: [], pagination: {} }
    };
  }
};

// 3. Get single project (public)
export const getProject = async (projectId) => {
  try {
    console.log('🔄 Fetching project with ID:', projectId);
    const response = await axiosInstance.get(`/project/${projectId}`);
    console.log('✅ Get project response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Get project error:', error);
    return error.response?.data || { 
      status: error.response?.status || 500, 
      success: false, 
      message: error.response?.data?.message || 'Failed to load project' 
    };
  }
};

// 4. Update project (authenticated) - دي اللي بنستخدمها
export const updateProject = async (projectId, data) => {
  try {
    console.log('📤 Updating project:', projectId);
    console.log('📤 Data being sent:', JSON.stringify(data, null, 2));
    
    const response = await axiosInstance.patch(`/project-update/${projectId}`, data);
    
    console.log('✅ Update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Update project error:', error);
    console.error('❌ Error response:', error.response?.data);
    
    // Return structured error
    return error.response?.data || { 
      status: error.response?.status || 500, 
      success: false, 
      message: error.response?.data?.message || 'Failed to update project' 
    };
  }
};

// 5. Delete project (authenticated)
export const deleteProject = async (projectId) => {
  try {
    const response = await axiosInstance.delete(`/project-delete/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Delete project error:', error);
    return error.response?.data || { 
      status: 500, 
      success: false, 
      message: 'Failed to delete project' 
    };
  }
};

// 6. Remove language/framework (authenticated)
export const removeProjectItems = async (projectId, data) => {
  try {
    const response = await axiosInstance.patch(`/project-remove/${projectId}`, data);
    return response.data;
  } catch (error) {
    console.error('Remove project items error:', error);
    return error.response?.data || { 
      status: 500, 
      success: false, 
      message: 'Failed to remove items' 
    };
  }
};