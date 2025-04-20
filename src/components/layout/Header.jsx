import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import './styles/Header.css'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className={`header ${menuOpen ? 'menu-open' : ''}`}>
      <Container>
        <div className="header-content">
          <div className="logo">
            <h1>MKO100</h1>
          </div>
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {!menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="#000" d="M3 18v-2h18v2H3zm0-5v-2h18v2H3zm0-5V6h18v2H3z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="#fff" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            )}
          </div>
        </div>
      </Container>
      
      {menuOpen && (
        <div className="fullscreen-menu">
          <div className="menu-content">
            <div className="menu-items">
              <Link to="/" onClick={() => setMenuOpen(false)}>TOP 100</Link>
              <Link to="/Faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
              <Link to="/With" onClick={() => setMenuOpen(false)}>WITH</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;