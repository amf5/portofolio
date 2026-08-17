import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../api/user';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const EditProfile = () => {
  const { user, updateUser: updateContextUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    job: user?.job || '',
    bio: user?.bio || '',
    location: user?.location || '',
    linkedin: user?.linkedin || '',
    github: user?.github || '',
    facebook: user?.facebook || '',
    whatsapp: user?.whatsapp || '',
    x: user?.x || '',
    cv: user?.cv || '',
    image: user?.image || '',
    skills: user?.skills || [],
  });

  const [skillInput, setSkillInput] = useState('');

  console.log('🔍 EditProfile - User data:', user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('📤 Updating user with data:', formData);
      
      const response = await updateUser(formData);
      console.log('📥 Update response:', response);
      
      if (response.status === 200) {
        updateContextUser(formData);
        toast.success('Profile updated successfully! 🎉');
        navigate('/profile');
      } else {
        toast.error(response.message || 'Failed to update profile');
        setLoading(false);
      }
    } catch (error) {
      console.error('❌ Update error:', error);
      
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold gradient-text mb-6">Edit Profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-primary"
            />
          </div>

          {/* Job */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              name="job"
              value={formData.job}
              onChange={handleChange}
              className="input-primary"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="input-primary"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-primary"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="input-primary"
              placeholder="https://github.com/username"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="input-primary"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          {/* Facebook */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="input-primary"
              placeholder="https://facebook.com/username"
            />
          </div>

          {/* X */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">X (Twitter) URL</label>
            <input
              type="url"
              name="x"
              value={formData.x}
              onChange={handleChange}
              className="input-primary"
              placeholder="https://x.com/username"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (with country code)</label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="input-primary"
              placeholder="+201234567890"
            />
          </div>

          {/* CV */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CV URL</label>
            <input
              type="url"
              name="cv"
              value={formData.cv}
              onChange={handleChange}
              className="input-primary"
              placeholder="https://example.com/cv.pdf"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                className="flex-1 input-primary"
                placeholder="Add skill..."
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <FiPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span key={skill} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
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
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                  Saving...
                </span>
              ) : (
                <><FiSave /> Save Changes</>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
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

export default EditProfile;