import React from 'react';
import { Plus, MessageSquare, Sun, Moon, Menu, History } from 'lucide-react';
import './Sidebar.css';

// Left side ka panel — New chat button, recent history, theme toggle
// Desktop par: normal push-sidebar jo collapse ho kar icon-only ban sakti hai
// Mobile par: slide-in drawer jo mobileOpen prop se control hoti hai
export default function Sidebar({
  history,
  onNewChat,
  onSelect,
  theme,
  onToggleTheme,
  collapsed,
  mobileOpen,
  onMenuClick,
}) {
  return (
    <div
      className={[
        'sidebar',
        collapsed ? 'sidebar--collapsed' : '',
        mobileOpen ? 'sidebar--mobile-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="sidebar__top">
        <div
          className="sidebar__icon-btn"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </div>

        <button
          className={`sidebar__new-chat ${collapsed ? 'sidebar__new-chat--collapsed' : ''}`}
          onClick={onNewChat}
        >
          <Plus size={16} />
          {!collapsed && <span>New chat</span>}
        </button>

        <div className={`sidebar__row ${collapsed ? 'sidebar__row--collapsed' : ''}`}>
          <History size={16} />
          {!collapsed && <span>Recent</span>}
        </div>

        {!collapsed && (
          <div className="sidebar__history">
            {history.length === 0 && (
              <p className="sidebar__history-empty">No history yet</p>
            )}
            {history.map((item, i) => (
              <div
                key={i}
                className="sidebar__history-item"
                onClick={() => onSelect(item)}
              >
                <MessageSquare size={14} />
                <span className="sidebar__history-text">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`sidebar__row ${collapsed ? 'sidebar__row--collapsed' : ''}`}
        onClick={onToggleTheme}
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        {!collapsed && <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>}
      </div>
    </div>
  );
}
