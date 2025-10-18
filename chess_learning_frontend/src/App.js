import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Layout from './components/layout/Layout';
import { AppRoutes } from './router/Routes';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application component.
   * Manages theme and renders header, layout, and route content.
   */
  const [theme, setTheme] = useState('light');

  // Apply the current theme to the html element so CSS variables take effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Layout>
        <AppRoutes />
      </Layout>
    </div>
  );
}

export default App;
