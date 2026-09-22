import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiTwitter,
  FiMail,
  FiSend,
  FiHeart,
  FiMapPin,
  FiPhone,
  FiArrowUp,
} from 'react-icons/fi';
import { getUserPortfolio } from '../../api/user';
import { toast } from 'react-hot-toast';

const Footer = () => {
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await getUserPortfolio();

      console.log('User Portfolio Data:', response);

      if (response?.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sending) return;

    if (!formData.name.trim()) {
      toast.error('Please enter your name.');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email.');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Please enter your message.');
      return;
    }

    setSending(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log('========== EMAILJS DEBUG ==========');
      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      console.log(
        'Public Key:',
        publicKey ? `${publicKey.substring(0, 4)}****` : 'MISSING'
      );
      console.log('Form Data:', formData);
      console.log('===================================');

      if (!serviceId) {
        throw new Error(
          'VITE_EMAILJS_SERVICE_ID is missing.'
        );
      }

      if (!templateId) {
        throw new Error(
          'VITE_EMAILJS_TEMPLATE_ID is missing.'
        );
      }

      if (!publicKey) {
        throw new Error(
          'VITE_EMAILJS_PUBLIC_KEY is missing.'
        );
      }

      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      console.log('========== EMAILJS SUCCESS ==========');
      console.log('Response:', response);
      console.log('Status:', response?.status);
      console.log('Text:', response?.text);
      console.log('=====================================');

      toast.success('Message sent successfully!');

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('========== EMAILJS ERROR ==========');
      console.error('Full Error:', error);
      console.error('Error Name:', error?.name);
      console.error('Error Message:', error?.message);
      console.error('Error Status:', error?.status);
      console.error('Error Text:', error?.text);
      console.error('Error Stack:', error?.stack);
      console.error('===================================');

      toast.error(
        error?.text ||
          error?.message ||
          'Failed to send message. Please try again.'
      );
    } finally {
      setSending(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    {
      key: 'github',
      icon: FiGithub,
      url: userData?.github,
      label: 'GitHub',
      color: 'hover:bg-gray-800',
    },
    {
      key: 'linkedin',
      icon: FiLinkedin,
      url: userData?.linkedin,
      label: 'LinkedIn',
      color: 'hover:bg-blue-700',
    },
    {
      key: 'facebook',
      icon: FiFacebook,
      url: userData?.facebook,
      label: 'Facebook',
      color: 'hover:bg-blue-600',
    },
    {
      key: 'x',
      icon: FiTwitter,
      url: userData?.x,
      label: 'X',
      color: 'hover:bg-gray-700',
    },
    {
      key: 'whatsapp',
      icon: FiPhone,
      url: userData?.whatsapp
        ? `https://wa.me/${userData.whatsapp.replace(
            /[^0-9]/g,
            ''
          )}`
        : null,
      label: 'WhatsApp',
      color: 'hover:bg-green-600',
    },
  ];

  const activeSocialLinks = socialLinks.filter(
    (link) => link.url
  );

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Column 1 */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              About
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              {userData?.bio ||
                'Building amazing experiences with code.'}
            </p>

            {userData?.location && (
              <p className="text-sm text-gray-400 mt-3 flex items-center gap-2">
                <FiMapPin className="text-blue-500" />
                {userData.location}
              </p>
            )}

            {userData?.email && (
              <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                <FiMail className="text-blue-500" />
                {userData.email}
              </p>
            )}
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-all hover:translate-x-2 inline-block"
                >
                  → Home
                </a>
              </li>

              <li>
                <a
                  href="/portfolio"
                  className="text-gray-400 hover:text-white transition-all hover:translate-x-2 inline-block"
                >
                  → Portfolio
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition
