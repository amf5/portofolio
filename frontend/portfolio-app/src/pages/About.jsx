import React, { useState, useEffect } from 'react';
import { getUserPortfolio } from '../api/user';
import { getAllProjects } from '../api/project';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import { toast } from 'react-hot-toast';

import {
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiTwitter,
  FiMail,
  FiMapPin,
  FiBriefcase,
  FiUser,
  FiCode,
  FiAward,
  FiGlobe,
  FiExternalLink,
  FiServer,
  FiDatabase,
  FiLayers,
  FiZap,
  FiFolder,
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
      // Fetch portfolio user
      const userResponse = await getUserPortfolio();

      console.log('About - User Data:', userResponse);

      if (userResponse.status === 200) {
        setPortfolioUser(userResponse.data);
      }

      // Fetch projects
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

  // Projects count
  const projectsCount = projects.length;

  // ==========================================
  // Social Links
  // ==========================================

  const socialLinks = [
    {
      key: 'github',
      icon: FiGithub,
      url: displayUser?.github,
      label: 'GitHub',
      color: 'bg-gray-900',
    },
    {
      key: 'linkedin',
      icon: FiLinkedin,
      url: displayUser?.linkedin,
      label: 'LinkedIn',
      color: 'bg-blue-700',
    },
    {
      key: 'facebook',
      icon: FiFacebook,
      url: displayUser?.facebook,
      label: '
