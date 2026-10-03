import React, { useState, useEffect } from 'react';
import {
  LogoIcon,
  DownloadIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
  CloseIcon,
  UserIcon,
  CodeIcon,
  BriefcaseIcon,
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
} from './Icons';

export default function Navbar({
  activeNav = 'home',
  currentPage = 'home',
  theme = 'light',
  onToggleTheme,
  onNavigate,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about', icon: <UserIcon size={18} /> },
    { id: 'skills', label: 'Skills', path: '/skills', icon: <CodeIcon size={18} /> },
    { id: 'projects', label: 'Projects', path: '/projects', icon: <BriefcaseIcon size={18} /> },
    { id: 'experience', label: 'Experience', path: '/experience', icon: <BriefcaseIcon size={18} /> },
    { id: 'contact', label: 'Contact', path: '/contact', icon: <MailIcon size={18} /> },
  ];

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(item.id);
    }
  };

  const isCurrentActive = (itemId) => {
    if (currentPage && currentPage !== 'home') {
      return currentPage === itemId;
    }
    return activeNav === itemId;
  };

  return (
    <header
      className="portfolio-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--nav-border)',
        transition: 'background 0.3s ease, border 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (onNavigate) onNavigate('home');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: 'var(--nav-text)',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.02em',
            flexShrink: 0,
          }}
        >
          <LogoIcon size={24} color="#f97316" />
          <span>DataPortfolio</span>
        </a>

        {/* Desktop Navigation Links (hidden on screens < 900px via CSS) */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const active = isCurrentActive(item.id);
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item)}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--accent-orange)' : 'var(--nav-text-muted)',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {item.label}
                {active && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '18px',
                      height: '2.5px',
                      borderRadius: '2px',
                      backgroundColor: 'var(--accent-orange)',
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle Dark/Light Mode"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          >
            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          {/* Desktop "Download Resume" Button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigate) onNavigate('resume');
            }}
            className="btn-primary desktop-resume-btn"
            style={{
              padding: '9px 18px',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
            }}
          >
            <DownloadIcon size={15} />
            <span>Resume</span>
          </button>

          {/* Mobile Hamburger Toggle Button (visible only on < 900px via CSS) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            className="mobile-menu-trigger"
            style={{
              display: 'none', // Overridden by CSS @media (max-width: 899px)
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: mobileMenuOpen ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              border: mobileMenuOpen
                ? '1px solid rgba(249, 115, 22, 0.5)'
                : '1px solid rgba(255, 255, 255, 0.15)',
              color: mobileMenuOpen ? 'var(--accent-orange)' : '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="mobile-drawer-backdrop"
          style={{
            position: 'fixed',
            top: '67px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 99,
            animation: 'fadeInBackdrop 0.25s ease',
          }}
        />
      )}

      {/* Mobile Navigation Drawer Menu */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: '67px',
          right: 0,
          width: '100%',
          maxWidth: '320px',
          height: 'calc(100vh - 67px)',
          background: '#0e141a',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.7)',
          padding: '24px 20px',
          display: mobileMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 100,
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Nav Links Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-hero-muted)',
              marginBottom: '8px',
              paddingLeft: '6px',
            }}
          >
            Navigation
          </div>

          {navItems.map((item) => {
            const active = isCurrentActive(item.id);
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#ffffff' : '#cbd5e1',
                  background: active ? 'rgba(249, 115, 22, 0.15)' : 'transparent',
                  border: active
                    ? '1px solid rgba(249, 115, 22, 0.4)'
                    : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <span style={{ color: active ? 'var(--accent-orange)' : '#94a3b8' }}>
                  {item.icon || <LogoIcon size={18} color={active ? '#f97316' : '#94a3b8'} />}
                </span>
                <span>{item.label}</span>
                {active && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-orange)',
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Bottom Drawer Actions */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Full-width Resume button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigate) onNavigate('resume');
            }}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px',
              fontSize: '0.95rem',
              cursor: 'pointer',
            }}
          >
            <DownloadIcon size={16} />
            <span>Download / View Resume</span>
          </button>

          {/* Social Icons row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <a
              href="https://github.com/Aravanant"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn social-github"
              aria-label="GitHub"
              style={{ width: '34px', height: '34px' }}
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/anant-singh-se"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn social-linkedin"
              aria-label="LinkedIn"
              style={{ width: '34px', height: '34px' }}
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn social-twitter"
              aria-label="Twitter"
              style={{ width: '34px', height: '34px' }}
            >
              <TwitterIcon size={14} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn social-instagram"
              aria-label="Instagram"
              style={{ width: '34px', height: '34px' }}
            >
              <InstagramIcon size={16} />
            </a>
          </div>

          <div
            style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              color: '#64748b',
            }}
          >
            Anant Singh • Data Analyst
          </div>
        </div>
      </div>
    </header>
  );
}
