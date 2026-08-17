import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserPortfolio } from '../../api/user';
import { getAllProjects } from '../../api/project';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';
import { toast } from 'react-hot-toast';
import { 
  FiEdit, FiMail, FiMapPin, FiBriefcase, FiGithub, FiLinkedin, 
  FiFacebook, FiTwitter, FiGlobe, FiFolder, FiCode, FiUser,
  FiExternalLink, FiYoutube, FiInstagram, FiDownload, FiFileText
} from 'react-icons/fi';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [portfolioUser, setPortfolioUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const portfolioResponse = await getUserPortfolio();
      console.log('Portfolio Data:', portfolioResponse);
      if (portfolioResponse.status === 200) {
        setPortfolioUser(portfolioResponse.data);
      }

      const projectsResponse = await getAllProjects(1, 100);
      if (projectsResponse.status === 200) {
        setProjects(projectsResponse.data.projects || []);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast.error('Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  };

  // ===== دالة تحميل الـ CV =====
  const handleDownloadCV = () => {
    const cvUrl = displayUser?.cv;
    
    if (!cvUrl) {
      toast.error('CV not available');
      return;
    }

    try {
      // فتح الرابط في تاب جديد
      window.open(cvUrl, '_blank');
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast.error('Failed to download CV');
    }
  };

  if (loading) {
    return <Loading />;
  }

  const displayUser = portfolioUser || user;

  if (!displayUser) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">No user data available</p>
      </div>
    );
  }

  // أيقونات التواصل الاجتماعي
  const socialLinks = [
    { key: 'github', icon: FiGithub, url: displayUser?.github, label: 'GitHub', color: 'bg-gray-900' },
    { key: 'linkedin', icon: FiLinkedin, url: displayUser?.linkedin, label: 'LinkedIn', color: 'bg-blue-700' },
    { key: 'facebook', icon: FiFacebook, url: displayUser?.facebook, label: 'Facebook', color: 'bg-blue-600' },
    { key: 'x', icon: FiTwitter, url: displayUser?.x, label: 'X', color: 'bg-gray-800' },
    { key: 'whatsapp', icon: FiExternalLink, url: displayUser?.whatsapp ? `https://wa.me/${displayUser.whatsapp.replace(/[^0-9]/g, '')}` : null, label: 'WhatsApp', color: 'bg-green-600' },
    { key: 'youtube', icon: FiYoutube, url: displayUser?.youtube, label: 'YouTube', color: 'bg-red-600' },
    { key: 'instagram', icon: FiInstagram, url: displayUser?.instagram, label: 'Instagram', color: 'bg-pink-600' },
  ];

  const activeSocialLinks = socialLinks.filter(link => link.url);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover */}
          <div className="h-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden shadow-xl">
                {displayUser.image ? (
                  <img src={displayUser.image} alt={displayUser.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl text-white">
                    {displayUser.name?.charAt(0).toUpperCase() || <FiUser />}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">{displayUser.name || 'User'}</h1>
              {displayUser.job && (
                <p className="text-gray-600 flex items-center justify-center gap-2 mt-1">
                  <FiBriefcase /> {displayUser.job}
                </p>
              )}
              {displayUser.location && (
                <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mt-1">
                  <FiMapPin /> {displayUser.location}
                </p>
              )}
              {displayUser.email && (
                <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mt-1">
                  <FiMail /> {displayUser.email}
                </p>
              )}
            </div>

            {/* Bio */}
            {displayUser.bio && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-700">{displayUser.bio}</p>
              </div>
            )}

            {/* Skills */}
            {displayUser.skills && displayUser.skills.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2 mb-3">
                  <FiCode /> Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {displayUser.skills.map((skill) => (
                    <span key={skill} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ===== زر تحميل الـ CV ===== */}
            {displayUser.cv && (
              <div className="mt-6">
                <button
                  onClick={handleDownloadCV}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 hover:scale-105 duration-300"
                >
                  <FiFileText size={20} />
                  <span>Download CV</span>
                  <FiDownload size={18} />
                </button>
              </div>
            )}

            {/* Social Links */}
            {activeSocialLinks.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2 mb-3">
                  <FiGlobe /> Connect With Me
                </h3>
                <div className="flex flex-wrap gap-3">
                  {activeSocialLinks.map((link) => (
                    <a
                      key={link.key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 ${link.color} text-white rounded-xl hover:opacity-90 transition-all hover:scale-105 text-sm`}
                    >
                      <link.icon /> {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Edit Button */}
            {isAuthenticated && (
              <div className="mt-8 text-center">
                <Link
                  to="/profile/edit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30"
                >
                  <FiEdit /> Edit Profile
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FiFolder /> My Projects
            </h2>
            {isAuthenticated && (
              <Link
                to="/project/create"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 text-sm"
              >
                + Add Project
              </Link>
            )}
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No projects available yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ===== Project Card Component =====
const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] duration-300">
      {project.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {project.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.language?.slice(0, 3).map((lang) => (
            <span key={lang} className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full">
              {lang}
            </span>
          ))}
          {project.framework?.slice(0, 2).map((fw) => (
            <span key={fw} className="bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full">
              {fw}
            </span>
          ))}
        </div>
        
        <Link
          to={`/project/${project._id}`}
          className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Profile;