import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../utils/constants';

const DashboardLayout = () => {
  const { logout, user, updateAvatar } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pressureDrop, setPressureDrop] = useState(120); // Default to clean filter
  const profileRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Fetch live status for the HEPA filter
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/dashboard/status`);
        const json = await response.json();
        if (json.success && json.data?.fan?.pressureDrop) {
          setPressureDrop(json.data.fan.pressureDrop);
        }
      } catch (err) {
        // silently fail on layout
      }
    };
    fetchStatus();
    const timer = setInterval(fetchStatus, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check size limit (e.g., 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large. Please select an image under 2MB.");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      await updateAvatar(base64String);
      setUploading(false);
      setIsProfileOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuD19Ffkvt83wGMWyRvdCLWrvDtVrGlsLcZrvGvnntwFTd3i2prFluDN5ewWHtGA2Fz7Xbnak36vqM7sdouPJNqGVVq4l9VsbpvMHLbaHkBXdIuoQkVlhJhj8N9C6ItfE5QmdxhgteQH839qaJ7J1lFxD7WYNDvJMq14BhSo3f-tsO-CGmMXW0trRBqyYMWlPrdxBlOdL7olRkqwdXzakzFnRFr-pvGQq1gD8p92TpZM07ccfqfYxV0bdA";

  // Calculate filter percentage from pressure drop.
  // Assuming a clean filter is ~100 Pa and a clogged one is ~250 Pa.
  const maxDrop = 250;
  const minDrop = 100;
  const safeDrop = Math.min(Math.max(pressureDrop, minDrop), maxDrop);
  const filterPercent = Math.round(100 - ((safeDrop - minDrop) / (maxDrop - minDrop)) * 100);
  
  // Rough estimation of days remaining
  const estDays = Math.max(0, Math.round(filterPercent * 1.54)); // 154 days max roughly 5 months

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex">
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <aside className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-space-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col gap-space-xl">
          <div className="px-space-lg flex items-center gap-space-sm">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">air</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">Smart Air Purifier</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Clean Air Core v2.4</span>
            </div>
          </div>
          <nav className="flex flex-col gap-space-2xs px-space-md">
            <NavLink to="/" end onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/air-quality" onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">air</span>
              <span>Air Quality</span>
            </NavLink>
            <NavLink to="/ai-predictions" onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span>AI Predictions</span>
            </NavLink>
            <NavLink to="/fan-recommendation" onClick={() => setIsSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">mode_fan</span>
              <span>Fan Recommendation</span>
            </NavLink>


          </nav>
        </div>
        <div className="px-space-md">
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">HEPA Filter State</span>
              <span className="font-label-caps text-label-caps text-tertiary">{filterPercent}% Optimal</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${filterPercent > 50 ? 'bg-tertiary' : filterPercent > 20 ? 'bg-secondary' : 'bg-error'}`} style={{ width: `${filterPercent}%` }}></div>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Est. {estDays} days remaining</span>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen w-full pl-0 md:pl-72 transition-all duration-300">
        <header className="fixed top-0 left-0 md:left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg md:px-space-xl transition-all duration-300">
          <div className="flex items-center">
            <button 
              className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high text-on-surface mr-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-md">
              <div className="relative" ref={profileRef}>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange} 
                />
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center rounded-full outline-none focus:ring-2 focus:ring-primary transition-transform hover:scale-105 relative"
                >
                  <img alt="Profile" className="w-8 h-8 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.08)] bg-white" src={user?.avatar || defaultAvatar} />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[16px] animate-spin">sync</span>
                    </div>
                  )}
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-surface-container-high rounded-xl shadow-lg border border-outline-variant overflow-hidden z-50">
                    <div className="flex flex-col p-4 border-b border-outline-variant bg-surface">
                      <span className="font-label-md text-label-md text-on-surface truncate">{user?.name || "Lab Admin"}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">{user?.email || "Cleanroom Tier-1"}</span>
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center gap-space-sm px-space-sm py-space-sm rounded-lg transition-all duration-150 text-on-surface font-label-md text-label-md hover:bg-surface-container hover:text-primary text-left"
                      >
                        <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                        <span>Change Photo</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-space-sm px-space-sm py-space-sm rounded-lg transition-all duration-150 text-error font-label-md text-label-md hover:bg-error-container hover:text-on-error-container text-left"
                      >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full pt-16 bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
