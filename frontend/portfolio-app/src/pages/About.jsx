import React, { useState, useEffect } from 'react';
import { getUserPortfolio } from '../api/user';
import { getAllProjects } from '../api/project';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import { toast } from 'react-hot-toast';
import { 
  FiGithub, FiLinkedin, FiFacebook, FiTwitter, FiMail, FiMapPin, 
  FiBriefcase, FiUser, FiCode, FiAward, FiBook, FiGlobe,
  FiExternalLink, FiServer, FiDatabase, FiLayers, FiZap,
  FiFolder, FiUsers
} from 'react-icons/fi';

const About = () => {
  const { user } = useAuth();
  const [portfolioUser, setPortfolioUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // جلب بيانات المستخدم من user-portofoli
      const userResponse = await getUserPortfolio();
      console.log('About - User Data:', userResponse);
      if (userResponse.status === 200) {
        setPortfolioUser(userResponse.data);
      }

      // جلب كل المشاريع لحساب العدد
      const projectsResponse = await getAllProjects(1, 100);
      console.log('About - Projects Data:', projectsResponse);
      if (projectsResponse.status === 200) {
        setProjects(projectsResponse.data.projects || []);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
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

  // حساب عدد المشاريع
  const projectsCount = projects.length;

  // أيقونات التواصل الاجتماعي
  const socialLinks = [
    { key: 'github', icon: FiGithub, url: displayUser?.github, label: 'GitHub', color: 'bg-gray-900' },
    { key: 'linkedin', icon: FiLinkedin, url: displayUser?.linkedin, label: 'LinkedIn', color: 'bg-blue-700' },
    { key: 'facebook', icon: FiFacebook, url: displayUser?.facebook, label: 'Facebook', color: 'bg-blue-600' },
    { key: 'x', icon: FiTwitter, url: displayUser?.x, label: 'X (Twitter)', color: 'bg-gray-800' },
    { key: 'whatsapp', icon: FiExternalLink, url: displayUser?.whatsapp ? `https://wa.me/${displayUser.whatsapp.replace(/[^0-9]/g, '')}` : null, label: 'WhatsApp', color: 'bg-green-600' },
  ];

  const activeSocialLinks = socialLinks.filter(link => link.url);

  // ===== المهارات التقنية من الـ API =====
  // هتاخد المهارات من displayUser.skills أو تستخدم المهارات الافتراضية
  const techSkillsFromAPI = displayUser?.skills || [];

  // مهارات تقنية افتراضية لو مفيش في الـ API
  const defaultTechSkills = [
    { name: 'Event-Driven Architecture', icon: '⚡', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'MVC Pattern', icon: '🏗️', color: 'bg-blue-100 text-blue-800' },
    { name: 'Java', icon: '☕', color: 'bg-red-100 text-red-800' },
    { name: 'Spring Boot', icon: '🌱', color: 'bg-green-100 text-green-800' },
    { name: 'Node.js', icon: '🟢', color: 'bg-green-100 text-green-800' },
    { name: 'Express.js', icon: '🚂', color: 'bg-gray-100 text-gray-800' },
    { name: 'MongoDB', icon: '🍃', color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Redis', icon: '🔴', color: 'bg-red-100 text-red-800' },
    { name: 'Bull Queue', icon: '🐂', color: 'bg-orange-100 text-orange-800' },
    { name: 'Docker', icon: '🐳', color: 'bg-blue-100 text-blue-800' },
  ];

  // استخدام المهارات من الـ API لو موجودة، وإلا استخدم الافتراضية
  const techSkills = techSkillsFromAPI.length > 0 
    ? techSkillsFromAPI.map(skill => ({
        name: skill,
        icon: '💻',
        color: 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'
      }))
    : defaultTechSkills;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header - بيجيب البيانات من الـ API */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text">
            {displayUser?.name ? `About ${displayUser.name}` : 'About Me'}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 mt-4">
            {displayUser?.job || 'Backend Developer | Event-Driven Systems | Problem Solver'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl text-white shadow-xl overflow-hidden">
                {displayUser.image ? (
                  <img src={displayUser.image} alt={displayUser.name} className="w-full h-full object-cover" />
                ) : (
                  displayUser.name?.charAt(0).toUpperCase() || <FiUser />
                )}
              </div>
            </div>

            {/* Info - بيجيب البيانات من الـ API */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{displayUser.name || 'Ahmed Walid'}</h2>
              {displayUser.job && (
                <p className="text-blue-600 font-medium flex items-center gap-2 mt-1">
                  <FiBriefcase /> {displayUser.job}
                </p>
              )}
              {displayUser.location && (
                <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                  <FiMapPin /> {displayUser.location}
                </p>
              )}
              {displayUser.email && (
                <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                  <FiMail /> {displayUser.email}
                </p>
              )}

              {displayUser.bio && (
                <p className="text-gray-600 mt-4">{displayUser.bio}</p>
              )}

              {/* Tech Skills - من الـ API أو افتراضية */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2">
                  <FiCode /> Tech Skills
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {techSkills.map((skill) => (
                    <span key={skill.name} className={`${skill.color} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}>
                      <span>{skill.icon}</span> {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills من الـ API */}
              {displayUser.skills && displayUser.skills.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2">
                    <FiAward /> Soft Skills
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {displayUser.skills.map((skill) => (
                      <span key={skill} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links - من الـ API */}
              {activeSocialLinks.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase flex items-center gap-2">
                    <FiGlobe /> Connect
                  </h4>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {activeSocialLinks.map((link) => (
                      <a
                        key={link.key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 ${link.color} text-white rounded-xl hover:opacity-90 transition-all hover:scale-110`}
                        title={link.label}
                      >
                        <link.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats - Projects من الـ API */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                <FiFolder size={24} />
              </div>
              <p className="text-3xl font-bold text-blue-600">{projectsCount}+</p>
              <p className="text-sm text-gray-500">Projects</p>
            </div>
          </div>

          {/* Event-Driven MVC Section */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FiZap className="text-yellow-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Event-Driven MVC Architecture</h3>
                <p className="text-sm text-gray-500">Building Scalable, Reactive Systems</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-yellow-500">
                <div className="flex items-center gap-2 text-yellow-600 mb-2">
                  <FiLayers /> Event-Driven
                </div>
                <p className="text-sm text-gray-600">Asynchronous communication between services</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <FiServer /> MVC Pattern
                </div>
                <p className="text-sm text-gray-600">Model-View-Controller for clean separation</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-purple-500">
                <div className="flex items-center gap-2 text-purple-600 mb-2">
                  <FiDatabase /> Event Sourcing
                </div>
                <p className="text-sm text-gray-600">Store state as sequence of events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;