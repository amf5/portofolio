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
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getUserPortfolio();

      console.log('Footer - User Data:', response);

      if (response?.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error fetching portfolio user:', error);
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

    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log('EmailJS Config:', {
      serviceId: serviceId ? 'Loaded' : 'Missing',
      templateId: templateId ? 'Loaded' : 'Missing',
      publicKey: publicKey ? 'Loaded' : 'Missing',
    });

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are missing');

      toast.error('Email service is not configured correctly');

      return;
    }

    setSending(true);

    try {
      const templateParams = {
        title: 'New message from your portfolio',
        from_name: formData.name,
        from_email: formData.email,
        date: new Date().toLocaleString('en-EG'),
        message: formData.message,
      };

      console.log('EmailJS Template Params:', templateParams);

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('EmailJS Success:', response);

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
          'Failed to send message'
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
      url: user?.github,
      label: 'GitHub',
    },
    {
      key: 'linkedin',
      icon: FiLinkedin,
      url: user?.linkedin,
      label: 'LinkedIn',
    },
    {
      key: 'facebook',
      icon: FiFacebook,
      url: user?.facebook,
      label: 'Facebook',
    },
    {
      key: 'x',
      icon: FiTwitter,
      url: user?.x,
      label: 'X (Twitter)',
    },
  ];

  const activeSocialLinks = socialLinks.filter(
    (link) => link.url
  );

  return (
    <footer className="bg-gray-900 text-white mt-16">

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div>

            <h2 className="text-3xl font-bold mb-4">
              Let's Work Together
            </h2>

            <p className="text-gray-400 leading-relaxed mb-8">
              Have a project in mind or want to get in touch?
              Send me a message and I'll get back to you as
              soon as possible.
            </p>

            {/* Location */}
            {user?.location && (
              <div className="flex items-center gap-3 mb-4">

                <div className="p-3 bg-gray-800 rounded-xl">
                  <FiMapPin className="text-blue-400" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="text-gray-200">
                    {user.location}
                  </p>
                </div>

              </div>
            )}

            {/* Email */}
            {user?.email && (
              <div className="flex items-center gap-3 mb-4">

                <div className="p-3 bg-gray-800 rounded-xl">
                  <FiMail className="text-blue-400" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <a
                    href={`mailto:${user.email}`}
                    className="text-gray-200 hover:text-blue-400 transition-colors"
                  >
                    {user.email}
                  </a>
                </div>

              </div>
            )}

            {/* Phone */}
            {user?.phone && (
              <div className="flex items-center gap-3 mb-4">

                <div className="p-3 bg-gray-800 rounded-xl">
                  <FiPhone className="text-blue-400" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <a
                    href={`tel:${user.phone}`}
                    className="text-gray-200 hover:text-blue-400 transition-colors"
                  >
                    {user.phone}
                  </a>
                </div>

              </div>
            )}

            {/* Social Links */}
            {activeSocialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-8">

                {activeSocialLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      key={link.key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      title={link.label}
                      className="p-3 bg-gray-800 rounded-xl hover:bg-blue-600 transition-all hover:scale-110"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}

              </div>
            )}

          </div>

          {/* Contact Form */}
          <div>

            <h3 className="text-2xl font-bold mb-6">
              Send Me a Message
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>

                <label
                  htmlFor="footer-name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name
                </label>

                <input
                  id="footer-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  disabled={sending}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
                />

              </div>

              {/* Email */}
              <div>

                <label
                  htmlFor="footer-email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>

                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={sending}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
                />

              </div>

              {/* Message */}
              <div>

                <label
                  htmlFor="footer-message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>

                <textarea
                  id="footer-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  disabled={sending}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-60"
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
              >
                <FiSend />

                {sending
                  ? 'Sending...'
                  : 'Send Message'}
              </button>

            </form>

          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div className="container mx-auto px-4 py-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()}{' '}
              {user?.name || 'Ahmed Walid'}.
              All rights reserved.
            </p>

            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with
              <FiHeart className="text-red-500" />
              using React
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-3 bg-gray-800 rounded-xl hover:bg-blue-600 transition-all"
            >
              <FiArrowUp size={18} />
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
