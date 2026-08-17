import React, { useState, useEffect } from 'react';
import { getAllProjects } from '../api/project';
import { getUserPortfolio } from '../api/user';
import ProjectCard from '../components/project/ProjectCard';
import Loading from '../components/common/Loading';
import { toast } from 'react-hot-toast';
import { 
  FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, 
  FiBriefcase, FiUser, FiFacebook, FiGlobe, FiFileText,
  FiDownload, FiYoutube, FiInstagram, FiCode, FiArrowDown
} from 'react-icons/fi';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userResponse = await getUserPortfolio();
      console.log('User Portfolio Data:', userResponse);
      if (userResponse.status === 200) {
        setUserData(userResponse.data);
      }

      const projectsResponse = await getAllProjects(1, 100);
      if (projectsResponse.status === 200) {
        setProjects(projectsResponse.data.projects || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = () => {
    const cvUrl = userData?.cv;
    if (!cvUrl) {
      toast.error('CV not available');
      return;
    }
    try {
      window.open(cvUrl, '_blank');
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast.error('Failed to download CV');
    }
  };

  if (loading) {
    return <Loading />;
  }

  const socialLinks = [
    { key: 'github', icon: FiGithub, url: userData?.github, label: 'GitHub', color: 'hover:bg-gray-800' },
    { key: 'linkedin', icon: FiLinkedin, url: userData?.linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { key: 'facebook', icon: FiFacebook, url: userData?.facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
    { key: 'x', icon: FiTwitter, url: userData?.x, label: 'X (Twitter)', color: 'hover:bg-gray-700' },
    { key: 'whatsapp', icon: FiMail, url: userData?.whatsapp ? `https://wa.me/${userData.whatsapp.replace(/[^0-9]/g, '')}` : null, label: 'WhatsApp', color: 'hover:bg-green-600' },
    { key: 'youtube', icon: FiYoutube, url: userData?.youtube, label: 'YouTube', color: 'hover:bg-red-600' },
    { key: 'instagram', icon: FiInstagram, url: userData?.instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
  ];

  const activeSocialLinks = socialLinks.filter(link => link.url);

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION - Premium Design ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Avatar with Glow */}
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-slow"></div>
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-700"></div>
              <div className="relative w-56 h-56 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 ring-4 ring-white/20">
                {userData?.image ? (
                  <img src={userData.image} alt={userData.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-7xl text-white">
                    {userData?.name?.charAt(0).toUpperCase() || <FiUser className="w-20 h-20" />}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left animate-fade-in-up">
              <div className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold text-blue-600 bg-blue-100/80 backdrop-blur-sm rounded-full border border-blue-200/50">
                <FiCode className="inline mr-2" />
                Available for Projects
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
                <span className="gradient-text-hero">{userData?.name || 'Ahmed Walid'}</span>
              </h1>
              
              {userData?.job && (
                <p className="text-xl md:text-2xl text-gray-600 font-medium flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                  {userData.job}
                </p>
              )}
              
              {userData?.location && (
                <p className="text-gray-500 flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <FiMapPin className="text-blue-500" /> {userData.location}
                </p>
              )}
              
              {userData?.bio && (
                <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
                  {userData.bio}
                </p>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
                {userData?.cv && (
                  <button
                    onClick={handleDownloadCV}
                    className="btn-gradient px-8 py-4 text-base flex items-center gap-3"
                  >
                    <FiFileText size={22} />
                    <span>Download CV</span>
                    <FiDownload size={18} />
                  </button>
                )}
                <a
                  href="#projects"
                  className="btn-secondary px-8 py-4 text-base flex items-center gap-2"
                >
                  <span>View Projects</span>
                  <FiArrowDown className="animate-bounce" />
                </a>
              </div>

              {/* Social Links */}
              {activeSocialLinks.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                  {activeSocialLinks.map((link) => (
                    <a
                      key={link.key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3.5 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 text-gray-700 ${link.color} transition-all hover:scale-110 hover:shadow-xl hover:border-transparent`}
                      title={link.label}
                    >
                      <link.icon size={22} />
                    </a>
                  ))}
                </div>
              )}

              {/* Skills */}
              {userData?.skills && userData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
                  {userData.skills.map((skill) => (
                    <span key={skill} 
                      className="px-4 py-2 bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm text-blue-800 rounded-full text-sm font-medium border border-blue-200/50 hover:scale-105 transition-all duration-300">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex justify-center">
            <div className="w-1.5 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION - مع id="projects" ===== */}
      <section id="projects" className="py-20 bg-white/50 backdrop-blur-sm scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold text-purple-600 bg-purple-100/80 backdrop-blur-sm rounded-full border border-purple-200/50">
              <FiCode className="inline mr-2" />
              My Work
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
              Check out some of my recent work and projects I've built
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project._id} 
                  className="animate-fade-in-up" 
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-gray-200/50">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-gray-500 text-xl">No projects available yet</p>
              <p className="text-gray-400 mt-2">Stay tuned for amazing work!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;