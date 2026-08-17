import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProject, deleteProject } from '../../api/project';
import { useAuth } from '../../context/AuthContext';
import Loading from '../common/Loading';
import { toast } from 'react-hot-toast';
import { FiGithub, FiEdit, FiTrash2, FiArrowLeft, FiYoutube, FiCode } from 'react-icons/fi';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('🔍 Project ID from useParams:', projectId);

  useEffect(() => {
    if (projectId) {
      fetchProject();
    } else {
      toast.error('Project ID not found');
      navigate('/portfolio');
    }
  }, [projectId]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      console.log('🔄 Fetching project with ID:', projectId);
      const response = await getProject(projectId);
      console.log('📦 Full response:', response);
      
      if (response.status === 200 && response.data) {
        console.log('✅ Project data:', response.data);
        console.log('✅ Project ID:', response.data?._id);
        setProject(response.data);
      } else {
        toast.error('Project not found');
        navigate('/portfolio');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      toast.error('Error loading project');
      navigate('/portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await deleteProject(projectId);
      if (response.status === 200) {
        toast.success('Project deleted successfully');
        navigate('/portfolio');
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      toast.error('Error deleting project');
    }
  };

  // ===== التحقق من وجود ID قبل التوجيه =====
  const handleEditClick = () => {
    // استخدام project._id أو projectId من useParams
    const idToUse = project?._id || projectId;
    
    if (idToUse) {
      console.log('✅ Navigating to edit with ID:', idToUse);
      navigate(`/project/edit/${idToUse}`);
    } else {
      console.error('❌ Project ID is missing!');
      toast.error('Project ID is missing');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  const isOwner = user?._id === project.userId;
  console.log('🔍 Is owner:', isOwner);
  console.log('🔍 User ID:', user?._id);
  console.log('🔍 Project User ID:', project.userId);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/portfolio" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6">
        <FiArrowLeft /> Back to Projects
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {project.image && (
          <div className="relative h-96 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h1 className="text-4xl font-bold text-white">{project.name}</h1>
            </div>
          </div>
        )}
        
        <div className="p-8">
          {/* ===== Actions ===== */}
          {isOwner && (
            <div className="flex gap-3 mb-6">
              {/* ===== زر Edit المعدل ===== */}
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <FiEdit /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 text-lg mb-6">{project.description}</p>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2 mb-3">
              <FiCode /> Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.language?.map((lang) => (
                <span key={lang} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {lang}
                </span>
              ))}
              {project.framework?.map((fw) => (
                <span key={fw} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {fw}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                <FiGithub /> View Code
              </a>
            )}
            {project.urlVideo && (
              <a
                href={project.urlVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                <FiYoutube /> Watch Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;