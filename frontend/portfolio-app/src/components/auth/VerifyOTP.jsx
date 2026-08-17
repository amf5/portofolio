import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP, resendCode } from '../../api/auth';
import { toast } from 'react-hot-toast';
import { FiMail, FiShield, FiRefreshCw, FiCheck } from 'react-icons/fi';

const VerifyOTP = () => {
  const [email, setEmail] = useState(localStorage.getItem('resetEmail') || '');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await verifyOTP(email, code);
      
      if (response.status === 200) {
        localStorage.setItem('otpToken', response.token);
        toast.success('✅ OTP verified!');
        navigate('/change-password');
      } else {
        toast.error(response.message || 'Invalid OTP');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }

    setResendLoading(true);
    try {
      const response = await resendCode(email);
      if (response.status === 200) {
        toast.success('📧 New OTP sent!');
      } else {
        toast.error(response.message || 'Failed to resend');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
              <FiShield className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold gradient-text">Verify OTP</h2>
            <p className="text-gray-500 mt-2">Enter the 6-digit code sent to your email</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-primary pl-12"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OTP Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength="6"
                className="input-primary text-center text-2xl tracking-widest font-mono"
                placeholder="123456"
              />
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
                  Verifying...
                </span>
              ) : (
                <><FiCheck /> Verify OTP</>
              )}
            </button>
          </form>

          {/* Resend */}
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="mt-4 w-full text-center text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiRefreshCw className={resendLoading ? 'animate-spin' : ''} />
            {resendLoading ? 'Sending...' : "Didn't receive code? Resend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;