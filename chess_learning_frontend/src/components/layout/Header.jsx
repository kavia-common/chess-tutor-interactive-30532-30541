import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * App header with navigation and theme toggle
 * @param {{theme: 'light' | 'dark', onToggleTheme: () => void}} props
 */
export default function Header({ theme = 'light', onToggleTheme = () => {} }) {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, background: 'var(--ocean-primary)', borderRadius: 3 }} />
          <strong>Ocean Chess Tutor</strong>
        </div>
        <div className="nav-spacer" />
        <NavLink className={({ isActive }) => `navlink ${isActive ? 'active' : ''}`} to="/" aria-label="Home">Home</NavLink>
        <NavLink className={({ isActive }) => `navlink ${isActive ? 'active' : ''}`} to="/lessons" aria-label="Lessons">Lessons</NavLink>
        <NavLink className={({ isActive }) => `navlink ${isActive ? 'active' : ''}`} to="/play" aria-label="Play">Play</NavLink>
        <button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
}
