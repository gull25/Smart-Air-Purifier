import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-space-lg">
        <div className="flex flex-col gap-space-xl">
          <div className="px-space-lg flex items-center gap-space-sm">
            <img alt="AeroPulse AI Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1V9oFYBoZwKFvOSesllXFL6oCerICPKqO6XDEKc4iEQBPKaddBcNs3rTyD3L3am6b93nipvQFih2joSQycGmI5nnRGZcOMiqclqKSVhL2KP7LmZZh9_wKHUCvFfM9GeMqctzT6GgXC-aYJL5B_-puiByQxQpJUh62Z-IyU374KiCdlf9c_tTJ-NmXWmP1px3cV7OIW2Mee2S3GiAzh4kth9OAS__TvDCrtLctYE4Hvs42h5IMdTCVd9I0M" />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">AeroPulse AI</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Clean Air Core v2.4</span>
            </div>
          </div>
          <nav className="flex flex-col gap-space-2xs px-space-md">
            <NavLink to="/" end className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/air-quality" className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">air</span>
              <span>Air Quality</span>
            </NavLink>
            <NavLink to="/ai-predictions" className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span>AI Predictions</span>
            </NavLink>
            <NavLink to="/fan-recommendation" className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">mode_fan</span>
              <span>Fan Recommendation</span>
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">insights</span>
              <span>Analytics</span>
            </NavLink>
            <NavLink to="/device-management" className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">hub</span>
              <span>Device Management</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 ${isActive ? 'bg-primary text-on-primary font-label-md shadow-[0_4px_12px_rgba(0,97,148,0.2)]' : 'text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span>Settings</span>
            </NavLink>
            <button 
              type="button" 
              onClick={handleLogout}
              className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl transition-all duration-150 text-error font-label-md text-label-md hover:bg-error-container hover:text-on-error-container text-left mt-2"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>Logout</span>
            </button>
          </nav>
        </div>
        <div className="px-space-md">
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">HEPA Filter State</span>
              <span className="font-label-caps text-label-caps text-tertiary">92% Optimal</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Est. 142 days remaining</span>
          </div>
        </div>
      </aside>

      <div className="pl-72 flex flex-col min-h-screen">
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-xl">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant">Smart Facility</span>
            <span className="text-outline-variant font-body-sm text-body-sm">/</span>
            <span className="font-label-md text-label-md text-on-surface">HVAC Unit 04</span>
          </div>
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-full">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-md text-label-md text-on-surface">Online</span>
              <span className="text-outline-variant text-[11px]">•</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">ESP32 Connected</span>
              <span className="text-outline-variant text-[11px]">•</span>
              <div className="flex items-center gap-space-2xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">wifi</span>
                <span className="font-label-caps text-label-caps">98%</span>
              </div>
            </div>
            <div className="flex items-center gap-space-md">
              <button className="relative p-space-xs rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-on-surface" type="button">
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
              </button>
              <div className="flex items-center gap-space-sm pl-space-xs">
                <img alt="Profile" className="w-8 h-8 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.08)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD19Ffkvt83wGMWyRvdCLWrvDtVrGlsLcZrvGvnntwFTd3i2prFluDN5ewWHtGA2Fz7Xbnak36vqM7sdouPJNqGVVq4l9VsbpvMHLbaHkBXdIuoQkVlhJhj8N9C6ItfE5QmdxhgteQH839qaJ7J1lFxD7WYNDvJMq14BhSo3f-tsO-CGmMXW0trRBqyYMWlPrdxBlOdL7olRkqwdXzakzFnRFr-pvGQq1gD8p92TpZM07ccfqfYxV0bdA" />
                <div className="hidden md:flex flex-col text-left">
                  <span className="font-label-md text-label-md text-on-surface leading-none">Lab Admin</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">Cleanroom Tier-1</span>
                </div>
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
