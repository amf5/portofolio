import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProject, updateProject } from '../../api/project';
import { toast } from 'react-hot-toast';
import { FiSave, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const EditProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // استخراج الـ ID من الرابط مباشرة
  const getProjectIdFromUrl = () => {
    const path = location.pathname;
    console.log('🔍 Full pathname:', path);
    
    // لو الرابط: /project/edit/6a8340bf68e3f9bd3e336e83
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    console.log('🔍 Last part:', lastPart);
    
    // لو الرابط مش edit، يبقى ده الـ ID
    if (lastPart && lastPart !== 'edit' && lastPart !== 'project') {
      return lastPart;
    }
    
    return null;
  };
  
  const projectId = getProjectIdFromUrl();
  
  console.log('🔍 Project ID from URL:', projectId);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    github: '',
    image: '',
    urlVideo: '',
    language: [],
    framework: [],
  });

  const [languageInput, setLanguageInput] = useState('');
  const [frameworkInput, setFrameworkInput] = useState('');

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
    } else {
      toast.error('Invalid project ID');
      navigate('/portfolio');
    }
  }, [projectId]);

  const fetchProject = async (id) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Fetching project with ID:', id);
      const response = await getProject(id);
      console.log('📦 Full response:', response);
      
      if (response.status === 200 && response.data) {
        console.log('✅ Project data received:', response.data);
        setFormData({
          name: response.data.name || '',
          description: response.data.description || '',
          github: response.data.github || '',
          image: response.data.image || '',
          urlVideo: response.data.urlVideo || '',
          language: response.data.language || [],
          framework: response.data.framework || [],
        });
        setLoading(false);
      } else {
        console.error('❌ Project not found:', response);
        setError(response.message || 'Project not found');
        toast.error(response.message || 'Project not found');
        navigate('/portfolio');
      }
    } catch (error) {
      console.error('❌ Error fetching project:', error);
      setError(error.message || 'Error loading project');
      toast.error('Error loading project');
      navigate('/portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (field, value, setInput) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setInput('');
    }
  };

  const handleRemoveItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(i => i !== item)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const dataToSend = {
        name: formData.name,
        description: formData.description,
        github: formData.github,
        image: formData.image,
        urlVideo: formData.urlVideo || null,
        language: formData.language,
        framework: formData.framework,
      };

      console.log('📤 Sending update for project:', projectId);
      console.log('📤 Data being sent:', JSON.stringify(dataToSend, null, 2));

      const response = await updateProject(projectId, dataToSend);
      console.log('📥 Update response:', response);
      
      if (response.status === 200) {
        toast.success('✅ Project updated successfully!');
        navigate(`/project/${projectId}`);
      } else {
        console.error('❌ Update failed:', response);
        setError(response.message || 'Failed to update project');
        toast.error(response.message || 'Failed to update project');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('❌ Update error:', error);
      setError(error.message || 'Something went wrong');
      toast.error(error.message || 'Something went wrong');
      setSubmitting(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
          <h3 className="text-red-600 font-bold text-xl mb-2">⚠️ Error</h3>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate('/portfolio')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-500">Loading project...</p>
          <p className="text-sm text-gray-400">Project ID: {projectId || 'Not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold gradient-text mb-6">Edit Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="input-primary"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL *</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              required
              className="input-primary"
              placeholder="https://github.com/username/project"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="input-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Video */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (optional)</label>
            <input
              type="url"
              name="urlVideo"
              value={formData.urlVideo}
              onChange={handleChange}
              className="input-primary"
              placeholder="https://youtube.com/..."
            />
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Languages *</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem('language', languageInput, setLanguageInput)}
                className="flex-1 input-primary"
                placeholder="Add language..."
              />
              <button
                type="button"
                onClick={() => handleAddItem('language', languageInput, setLanguageInput)}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <FiPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.language.map((lang) => (
                <span key={lang} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {lang}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('language', lang)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frameworks *</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={frameworkInput}
                onChange={(e) => setFrameworkInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem('framework', frameworkInput, setFrameworkInput)}
                className="flex-1 input-primary"
                placeholder="Add framework..."
              />
              <button
                type="button"
                onClick={() => handleAddItem('framework', frameworkInput, setFrameworkInput)}
                className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                <FiPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.framework.map((fw) => (
                <span key={fw} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {fw}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('framework', fw)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 btn-primary flex items-center justify-center gap-2 ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                  Updating...
                </span>
              ) : (
                <><FiSave /> Update Project</>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/project/${projectId}`)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <FiX /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;