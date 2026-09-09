import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('secretpassword123');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="bg-[#f8fafc] text-slate-800 font-sans min-h-screen flex flex-col justify-between antialiased selection:bg-sky-500 selection:text-white">
      {/* Header / Minimal Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://lh3.googleusercontent.com/aida/AEtjO1V9oFYBoZwKFvOSesllXFL6oCerICPKqO6XDEKc4iEQBPKaddBcNs3rTyD3L3am6b93nipvQFih2joSQycGmI5nnRGZcOMiqclqKSVhL2KP7LmZZh9_wKHUCvFfM9GeMqctzT6GgXC-aYJL5B_-puiByQxQpJUh62Z-IyU374KiCdlf9c_tTJ-NmXWmP1px3cV7OIW2Mee2S3GiAzh4kth9OAS__TvDCrtLctYE4Hvs42h5IMdTCVd9I0M" alt="AeroPulse AI Logo" className="w-9 h-9 object-contain rounded-lg" />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">AeroPulse AI</span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">Smart Air Purifier</span>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          Don't have an account? 
          <Link to="/register" className="font-semibold text-primary hover:opacity-80 ml-1 transition-colors">Sign up</Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 sm:p-10">
          
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Sign in</h1>
            <p className="text-sm text-slate-500 mt-2">Welcome back! Please enter your details.</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button type="button" className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition text-sm font-medium text-slate-700 shadow-xs">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition text-sm font-medium text-slate-700 shadow-xs">
              <i className="fab fa-github text-base text-slate-900"></i>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-xs font-medium text-slate-400 uppercase tracking-wider">or email</span>
            <div className="border-t border-slate-200 w-full"></div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="email">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i className="far fa-envelope text-sm"></i>
                </div>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700" htmlFor="password">Password</label>
                <a href="#forgot" className="text-xs font-medium text-primary hover:opacity-80 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i className="fas fa-lock text-sm"></i>
                </div>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  required
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600">
                  <i className="far fa-eye text-sm"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary" />
                <span className="text-xs text-slate-600">Remember me for 30 days</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full py-2.5 px-4 rounded-xl bg-primary hover:opacity-90 text-on-primary font-medium text-sm shadow-sm transition duration-150 flex items-center justify-center gap-2 mt-2">
              <span>Sign In</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
          </form>

          {/* Quick test helper hint */}
          <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Demo mode: ESP32 Connected
            </span>
            <span className="font-mono text-[11px] text-slate-500">v2.4</span>
          </div>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-slate-400">
        &copy; 2025 AeroPulse AI. Clean Air Intelligence. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
