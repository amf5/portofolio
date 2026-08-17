import React, { useState, useEffect } from 'react';
import { getUserPortfolio } from '../../api/user';
import { 
  FiGithub, FiLinkedin, FiFacebook, FiTwitter, 
  FiMail, FiSend, FiHeart, FiMapPin, FiPhone,
  FiArrowUp
} from 'react-icons/fi';
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
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // ... باقي الكود
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { key: 'github', icon: FiGithub, url: userData?.github, label: 'GitHub', color: 'hover:bg-gray-800' },
    { key: 'linkedin', icon: FiLinkedin, url: userData?.linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { key: 'facebook', icon: FiFacebook, url: userData?.facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
    { key: 'x', icon: FiTwitter, url: userData?.x, label: 'X', color: 'hover:bg-gray-700' },
    { key: 'whatsapp', icon: FiPhone, url: userData?.whatsapp ? `https://wa.me/${userData.whatsapp.replace(/[^0-9]/g, '')}` : null, label: 'WhatsApp', color: 'hover:bg-green-600' },
  ];

  const activeSocialLinks = socialLinks.filter(link => link.url);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">About</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {userData?.bio || 'Building amazing experiences with code.'}
            </p>
            {userData?.location && (
              <p className="text-sm text-gray-400 mt-3 flex items-center gap-2">
                <FiMapPin className="text-blue-500" /> {userData.location}
              </p>
            )}
            {userData?.email && (
              <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                <FiMail className="text-blue-500" /> {userData.email}
              </p>
            )}
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-white transition-all hover:translate-x-2 inline-block">→ Home</a></li>
              <li><a href="/portfolio" className="text-gray-400 hover:text-white transition-all hover:translate-x-2 inline-block">→ Portfolio</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-all hover:translate-x-2 inline-block">→ About</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {activeSocialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-800/50 rounded-xl ${link.color} transition-all hover:scale-110 hover:text-white backdrop-blur-sm`}
                  title={link.label}
                >
                  <link.icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows="3"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full btn-gradient py-3 text-sm font-semibold flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    Sending...
                  </>
                ) : (
                  <><FiSend /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              © {new Date().getFullYear()} Portfolio. Made with{' '}
              <FiHeart className="text-red-500 animate-pulse" /> by {userData?.name || 'Ahmed Walid'}
            </p>
            <button
              onClick={scrollToTop}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/30"
            >
              <FiArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;