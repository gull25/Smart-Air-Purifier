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
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[24px]">air</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">Smart Air Purifier</span>
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
        &copy; 2025 Smart Air Purifier. Clean Air Intelligence. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
