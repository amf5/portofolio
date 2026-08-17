import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../api/project';
import { toast } from 'react-hot-toast';
import { FiSave, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const CreateProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const response = await createProject(formData);
      if (response.status === 201) {
        toast.success('Project created successfully! 🎉');
        navigate('/portfolio');
      } else {
        toast.error(response.message || 'Failed to create project');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold gradient-text mb-6">Create New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
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
                placeholder="e.g., JavaScript"
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
                placeholder="e.g., React"
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
              disabled={loading}
              className={`flex-1 btn-primary flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating...
                </span>
              ) : (
                <><FiSave /> Create Project</>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/portfolio')}
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

export default CreateProject;