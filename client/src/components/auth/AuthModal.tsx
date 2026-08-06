import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, Phone, User, ShieldCheck, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import api from '@/src/mock/apiCall';
import { Label } from 'recharts';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { userLogin, userRegister } from '@/src/redux/auth/authApi';
import { clearImmediateError } from '@/src/redux/auth/registerSlice';
import { useNavigate } from 'react-router-dom';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, setAuthModalOpen, authModalView, setAuthModalView, 
    authModalTargetRole, setRole, setActiveTab, showToast 
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(authModalTargetRole || 'user');
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

   const dispatch = useAppDispatch();
 const { isLoading, error, registerSuccess } = useAppSelector((state) => state.register);
 const { loginisLoading, loginError, loginSuccess } = useAppSelector((state) => state.login);


 function resetFormFields() {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setLocation('');
    setOtp(['', '', '', '']);
  }

  // Sync selectedRole whenever authModalTargetRole changes
React.useEffect(() => {
  if (authModalOpen) {
    dispatch(clearImmediateError());
    resetFormFields();
  }
}, [authModalOpen, dispatch]);
  if (!authModalOpen) return null;

  const handleQuickFill = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'user') {
      setEmail('aarav.sharma@example.com');
      setPassword('resident123');
    } else if (role === 'owner') {
      setEmail('rajesh.kumar@example.com');
      setPassword('owner123');
    } else if (role === 'admin') {
      setEmail('admin@pgnest.com');
      setPassword('admin123');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      showToast('Please enter your password to log in', 'error');
      return;
    }
    
    setRole(selectedRole);
    // if (selectedRole === 'user') {
    //   setActiveTab('user_dashboard');
    //   showToast('Logged in as Resident Guest. Welcome!', 'success');
    // } else if (selectedRole === 'owner') {
    //   setActiveTab('owner_dashboard');
    //   showToast('Logged in as PG Owner. Welcome to your SaaS dashboard!', 'success');
    // } else if (selectedRole === 'admin') {
    //   setActiveTab('admin_dashboard');
    //   showToast('Authenticated as Admin. Systems active.', 'success');
    // }

      dispatch(userLogin({ email, password, role: selectedRole }));
        navigate('/user/dashboard');
        setAuthModalOpen(false);
      if(loginSuccess) { 
        setAuthModalOpen(false);
       }
    
  };

  const handleSignupSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
     const signupResponse = dispatch(userRegister({ name, email, phone, role: selectedRole, password,location }));
       if (registerSuccess) {
         showToast('Account created! Please verify your mobile & email.', 'success');
         setAuthModalView('otp');
       }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    setAuthModalOpen(false);
    showToast('Mobile & Email verified! Account created.', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-red-500/20">
                P
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">PGNest</span>
            </div>
           
            <button
              onClick={() => setAuthModalOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role selector pill */}
          <div className="mt-4 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex text-xs font-semibold">
            <button
              onClick={() => setSelectedRole('user')}
              className={`flex-1 py-2 rounded-xl transition-all ${selectedRole === 'user' ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              Resident Guest
            </button>
            <button
              onClick={() => setSelectedRole('owner')}
              className={`flex-1 py-2 rounded-xl transition-all ${selectedRole === 'owner' ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              PG Owner
            </button>
           
          </div>

          {/* Views */}
          {authModalView === 'login' && (
            <form onSubmit={handleLoginSubmit} className="mt-4 space-y-3.5">
              {/* Demo auto-fill helper chips */}
              {loginError && (
                <div className="bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 p-2.5 rounded-2xl border border-red-200 dark:border-red-800">
                  {loginError}
                </div>
              )}
      

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Email or Phone Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                  <input type="checkbox" className="rounded text-red-600 focus:ring-red-500" defaultChecked />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => setAuthModalView('forgot')}
                  className="text-red-600 hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2"
              >
                Login as {selectedRole.toUpperCase()} <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalView('signup')}
                  className="text-red-600 dark:text-red-400 font-semibold hover:underline"
                >
                  Sign up now
                </button>
              </div>
            </form>
          )}

          {authModalView === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="mt-5 space-y-3.5">
              {error && (
                <div className="text-red-600 text-sm font-medium text-center">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Enter your location"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
               <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="aarav@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                 disabled={isLoading}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2"
              >
                Continue to Verification <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalView('login')}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Log in
                </button>
              </div>
            </form>
          )}

          {authModalView === 'otp' && (
            <form onSubmit={handleOtpVerify} className="mt-5 space-y-4 text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-2xl mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Enter OTP Verification Code</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  We sent a 4-digit code to <span className="font-medium text-slate-800 dark:text-slate-200">{phone || '+91 98765 43210'}</span>
                </p>
              </div>

              <div className="flex justify-center gap-3 my-2">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={e => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-12 text-center text-xl font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl shadow-lg transition-all"
              >
                Verify & Create Account
              </button>
            </form>
          )}

          {authModalView === 'forgot' && (
            <div className="mt-5 space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Enter your registered email address to receive a password reset link.
              </p>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
              <button
                onClick={() => {
                  showToast('Password reset link sent to your email!', 'info');
                  setAuthModalView('login');
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl shadow-md"
              >
                Send Reset Link
              </button>
              <button
                onClick={() => setAuthModalView('login')}
                className="w-full text-center text-xs text-slate-500 hover:underline"
              >
                Back to Login
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
