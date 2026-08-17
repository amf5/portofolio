import { useState, useEffect, useCallback } from 'react';
import { getAllProjects, getProject, createProject, updateProject, deleteProject } from '../api/project';
import { toast } from 'react-hot-toast';

export const useProjects = (initialPage = 1, limit = 10) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
    totalProjects: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Fetch all projects
  const fetchProjects = useCallback(async (page = initialPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProjects(page, limit);
      if (response.status === 200) {
        setProjects(response.data.projects || []);
        setPagination(response.data.pagination || {});
      } else {
        setError(response.message || 'Failed to load projects');
        toast.error(response.message || 'Failed to load projects');
      }
    } catch (error) {
      setError(error.message || 'Error loading projects');
      toast.error('Error loading projects');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // Get single project
  const fetchProject = useCallback(async (projectId) => {
    try {
      const response = await getProject(projectId);
      if (response.status === 200) {
        return response.data;
      } else {
        toast.error(response.message || 'Project not found');
        return null;
      }
    } catch (error) {
      toast.error('Error loading project');
      return null;
    }
  }, []);

  // Create project
  const createNewProject = useCallback(async (data) => {
    try {
      const response = await createProject(data);
      if (response.status === 201) {
        toast.success('Project created successfully! 🎉');
        await fetchProjects(pagination.currentPage);
        return response.data;
      } else {
        toast.error(response.message || 'Failed to create project');
        return null;
      }
    } catch (error) {
      toast.error('Error creating project');
      return null;
    }
  }, [fetchProjects, pagination.currentPage]);

  // Update project
  const updateExistingProject = useCallback(async (projectId, data) => {
    try {
      const response = await updateProject(projectId, data);
      if (response.status === 200) {
        toast.success('Project updated successfully! 🎉');
        await fetchProjects(pagination.currentPage);
        return response.data;
      } else {
        toast.error(response.message || 'Failed to update project');
        return null;
      }
    } catch (error) {
      toast.error('Error updating project');
      return null;
    }
  }, [fetchProjects, pagination.currentPage]);

  // Delete project
  const deleteExistingProject = useCallback(async (projectId) => {
    try {
      const response = await deleteProject(projectId);
      if (response.status === 200) {
        toast.success('Project deleted successfully! 🗑️');
        await fetchProjects(pagination.currentPage);
        return true;
      } else {
        toast.error(response.message || 'Failed to delete project');
        return false;
      }
    } catch (error) {
      toast.error('Error deleting project');
      return false;
    }
  }, [fetchProjects, pagination.currentPage]);

  // Initial fetch
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    pagination,
    fetchProjects,
    fetchProject,
    createNewProject,
    updateExistingProject,
    deleteExistingProject,
  };
};