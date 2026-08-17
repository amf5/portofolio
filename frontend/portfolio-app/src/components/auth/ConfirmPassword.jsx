import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmOldPassword } from '../../api/auth';
import { toast } from 'react-hot-toast';
import { FiLock, FiEye, FiEyeOff, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const ConfirmPassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, logout the user
      await logout();
      
      // Then confirm password
      const response = await confirmOldPassword(password);
      
      if (response.status === 200) {
        // Save OTP token for password change
        localStorage.setItem('otpToken', response.token);
        // Save email for the next step
        const email = localStorage.getItem('userEmail');
        if (email) {
          localStorage.setItem('resetEmail', email);
        }
        toast.success('✅ Password confirmed!');
        navigate('/change-password');
      } else {
        toast.error(response.message || 'Wrong password');
        // If password is wrong, user is already logged out
        navigate('/login');
      }
    } catch (error) {
      toast.error('Something went wrong');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
              <FiLock className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold gradient-text">Confirm Password</h2>
            <p className="text-gray-500 mt-2">
              Enter your current password to change it
            </p>
            <p className="text-sm text-red-500 mt-2">
              ⚠️ You will be logged out for security
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-primary pl-12 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn-primary w-full flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Confirming...
                </span>
              ) : (
                <><FiCheck /> Confirm Password</>
              )}
            </button>
          </form>

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="mt-4 w-full text-center text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;