import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getUserPortfolio } from '../api/user';
import { getAllProjects } from '../api/project';
import { toast } from 'react-hot-toast';
import Loading from '../components/common/Loading';
import { 
  FiPlus, FiUser, FiFolder, FiSettings, FiTrendingUp, 
  FiGrid, FiBarChart2, FiAward, FiClock, FiCode,
  FiBriefcase, FiMapPin, FiMail, FiGithub, FiLinkedin
} from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const [portfolioUser, setPortfolioUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projectsCount: 0,
    skillsCount: 0,
    profileComplete: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // جلب بيانات المستخدم من user-portofoli (عام)
      const portfolioResponse = await getUserPortfolio();
      console.log('Dashboard - Portfolio Data:', portfolioResponse);
      if (portfolioResponse.status === 200) {
        setPortfolioUser(portfolioResponse.data);
      }

      // جلب المشاريع
      const projectsResponse = await getAllProjects(1, 100);
      console.log('Dashboard - Projects Data:', projectsResponse);
      if (projectsResponse.status === 200) {
        const projectsData = projectsResponse.data.projects || [];
        setProjects(projectsData);
      }

      // حساب الإحصائيات
      const userData = portfolioResponse.data || user;
      const skillsCount = userData?.skills?.length || 0;
      const projectsCount = projectsResponse.data?.projects?.length || 0;
      
      // حساب نسبة اكتمال الملف الشخصي
      let completeCount = 0;
      const totalFields = 8; // name, job, bio, location, image, skills, github, linkedin
      if (userData?.name) completeCount++;
      if (userData?.job) completeCount++;
      if (userData?.bio) completeCount++;
      if (userData?.location) completeCount++;
      if (userData?.image) completeCount++;
      if (userData?.skills?.length > 0) completeCount++;
      if (userData?.github) completeCount++;
      if (userData?.linkedin) completeCount++;
      
      const profileComplete = Math.round((completeCount / totalFields) * 100);

      setStats({
        projectsCount,
        skillsCount,
        profileComplete,
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const displayUser = portfolioUser || user;

  // أيقونات التواصل
  const socialLinks = [
    { key: 'github', icon: FiGithub, url: displayUser?.github, label: 'GitHub' },
    { key: 'linkedin', icon: FiLinkedin, url: displayUser?.linkedin, label: 'LinkedIn' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Welcome */}
      <div className="mb-10 animate-slide-up">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, <span className="gradient-text">{displayUser?.name || 'User'}!</span>
        </h1>
        <p className="text-gray-500 mt-2 flex items-center gap-2">
          <FiClock className="text-blue-500" /> 
          Manage your portfolio and profile
        </p>
      </div>

      {/* Stats Cards - Data from API */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-xl shadow-blue-500/30 animate-fade-in">
          <FiGrid className="text-2xl mb-2" />
          <p className="text-2xl font-bold">{stats.projectsCount}</p>
          <p className="text-sm text-blue-100">Projects</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow-xl shadow-purple-500/30 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <FiCode className="text-2xl mb-2" />
          <p className="text-2xl font-bold">{stats.skillsCount}</p>
          <p className="text-sm text-purple-100">Skills</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 text-white shadow-xl shadow-green-500/30 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <FiBarChart2 className="text-2xl mb-2" />
          <p className="text-2xl font-bold">{stats.profileComplete}%</p>
          <p className="text-sm text-green-100">Profile Complete</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 text-white shadow-xl shadow-orange-500/30 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <FiTrendingUp className="text-2xl mb-2" />
          <p className="text-2xl font-bold">{projects.length}</p>
          <p className="text-sm text-orange-100">Total Projects</p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/profile"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] duration-300 group"
        >
          <div className="p-3 bg-blue-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
            <FiUser className="text-blue-600 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
          <p className="text-gray-500 text-sm">View and edit your profile</p>
        </Link>

        <Link
          to="/project/create"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] duration-300 group"
        >
          <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
            <FiPlus className="text-purple-600 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Add Project</h3>
          <p className="text-gray-500 text-sm">Create a new project</p>
        </Link>

        <Link
          to="/portfolio"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] duration-300 group"
        >
          <div className="p-3 bg-green-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
            <FiFolder className="text-green-600 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">My Projects</h3>
          <p className="text-gray-500 text-sm">View all your projects</p>
        </Link>

        <Link
          to="/profile/edit"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] duration-300 group"
        >
          <div className="p-3 bg-orange-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
            <FiSettings className="text-orange-600 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
          <p className="text-gray-500 text-sm">Account settings</p>
        </Link>
      </div>

      {/* User Info Card */}
      {displayUser && (
        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiUser /> Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FiBriefcase className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Job</p>
                <p className="text-sm font-medium">{displayUser?.job || 'Not set'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FiMapPin className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium">{displayUser?.location || 'Not set'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FiMail className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium">{displayUser?.email || 'Not set'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FiCode className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Skills</p>
                <p className="text-sm font-medium">{displayUser?.skills?.length || 0} skills</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiClock /> Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-gray-600 text-sm">You updated your profile</p>
            <span className="text-gray-400 text-xs ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-gray-600 text-sm">New project added: "Portfolio App"</p>
            <span className="text-gray-400 text-xs ml-auto">1 day ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <p className="text-gray-600 text-sm">Your portfolio was viewed by 15 people</p>
            <span className="text-gray-400 text-xs ml-auto">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;