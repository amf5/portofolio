import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
  FiLogOut, FiUser, FiHome, FiFolder, FiSettings, 
  FiMenu, FiX, FiInfo, FiCode
} from 'react-icons/fi';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ===== دالة التمرير لصفحة المشاريع =====
  const scrollToProjects = (e) => {
    e.preventDefault();
    
    // لو في الصفحة الرئيسية
    if (window.location.pathname === '/') {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // لو في صفحة تانية، اروح للرئيسية وبعدين أمرر
      navigate('/');
      setTimeout(() => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  // ===== دالة التمرير للصفحة الرئيسية =====
  const scrollToHome = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold gradient-text flex items-center gap-2 hover:scale-105 transition-transform duration-300">
            <FiCode className="text-blue-600" />
            Portfolio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* ===== Home ===== */}
            <button
              onClick={scrollToHome}
              className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium"
            >
              <FiHome /> Home
            </button>

            {/* ===== Projects ===== */}
            <button
              onClick={scrollToProjects}
              className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium"
            >
              <FiFolder /> Projects
            </button>

            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium">
              <FiInfo /> About
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium">
                  <FiSettings /> Dashboard
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium">
                  <FiUser /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 font-medium"
                >
                  <FiLogOut /> Logout
                </button>
                <span className="text-sm font-bold text-gray-700 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full shadow-md">
                  {user?.name}
                </span>
              </>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-6 text-sm">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-gray-900 transition-colors"
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/20 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              <button
                onClick={(e) => {
                  scrollToHome(e);
                  toggleMenu();
                }}
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-3 text-lg text-left"
              >
                <FiHome /> Home
              </button>
              <button
                onClick={(e) => {
                  scrollToProjects(e);
                  toggleMenu();
                }}
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-3 text-lg text-left"
              >
                <FiFolder /> Projects
              </button>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-3 text-lg" onClick={toggleMenu}>
                <FiInfo /> About
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-3 text-lg" onClick={toggleMenu}>
                    <FiSettings /> Dashboard
                  </Link>
                  <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-3 text-lg" onClick={toggleMenu}>
                    <FiUser /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-3 text-lg text-left"
                  >
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn-primary py-3 px-6 text-center" onClick={toggleMenu}>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;