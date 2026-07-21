import React, { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar/Sidebar';
import ChatBody from './components/ChatBody/ChatBody';
import ChatInput from './components/ChatInput/ChatInput';
import CANNED_REPLIES from './data/cannedReplies';
import run from './data/gemini';
import './App.css';

// Dark / Light theme ke colors — CSS variables ki tarah root par apply honge
const THEMES = {
  dark: {
    '--bg': '#1e1f20',
    '--sidebar-bg': '#131314',
    '--fg': '#e3e3e3',
    '--bubble-user': '#282a2c',
    '--muted': 'rgba(227,227,227,0.5)',
    '--border': 'rgba(255,255,255,0.08)',
    '--shimmer-bg': 'linear-gradient(to right, #282a2c 8%, #383a3d 18%, #282a2c 33%)',
  },
  light: {
    '--bg': '#ffffff',
    '--sidebar-bg': '#f0f4f9',
    '--fg': '#1f1f1f',
    '--bubble-user': '#f0f4f9',
    '--muted': 'rgba(31,31,31,0.55)',
    '--border': 'rgba(0,0,0,0.08)',
    '--shimmer-bg': 'linear-gradient(to right, #e2e8f0 8%, #cbd5e1 18%, #e2e8f0 33%)',
  },
};

// Mobile breakpoint (isse chhote screen par sidebar drawer/overlay ban jaati hai)
const MOBILE_QUERY = '(max-width: 640px)';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [collapsed, setCollapsed] = useState(false); // desktop: icon-only sidebar
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // mobile: drawer open/close
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);

  // Naya message aane par chat ko neeche scroll karo
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [chat, loading]);

  // Sidebar ke andar wala Menu icon: mobile par drawer close karo,
  // desktop par sidebar collapse/expand karo (dono screen size ke liye ek hi button)
  const handleSidebarMenuClick = () => {
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    if (isMobile) {
      setMobileSidebarOpen(false);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setChat((prev) => [...prev, { role: 'user', text: userMessage }]);
    setHistory((prev) => (prev.includes(userMessage) ? prev : [userMessage, ...prev]));
    setLoading(true);

    try {
      const reply = await run(userMessage);
      setChat((prev) => [...prev, { role: 'ai', text: reply }]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        { role: 'ai', text: "Error connecting to Gemini API. Please check your network or API key." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app" style={THEMES[theme]}>
      {/* Sirf mobile screen par dikhne wala top bar, isi se sidebar drawer khulti hai */}
      <div className="mobile-topbar">
        <button
          className="mobile-topbar__menu-btn"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <span className="mobile-topbar__title">Gemini Clone</span>
      </div>

      <div className="app__layout">
        <Sidebar
          history={history}
          onNewChat={() => {
            setChat([]);
            setMobileSidebarOpen(false);
          }}
          onSelect={(p) => {
            setInput(p);
            setMobileSidebarOpen(false);
          }}
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          collapsed={collapsed}
          mobileOpen={mobileSidebarOpen}
          onMenuClick={handleSidebarMenuClick}
        />

        {/* Mobile par sidebar khuli ho to peeche dark overlay + tap-to-close */}
        {mobileSidebarOpen && (
          <div className="sidebar-backdrop" onClick={() => setMobileSidebarOpen(false)} />
        )}

        <div className="app__main">
          <ChatBody ref={bodyRef} chat={chat} loading={loading} />
          <ChatInput value={input} onChange={setInput} onSend={handleSend} loading={loading} />
        </div>
      </div>
    </div>
  );
}
