import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SmoothScrollAnimation from './SmoothScrollAnimation';
import DashboardSection from './DashboardSection';
import ProjectsPage from './ProjectsPage';
import AboutPage from './AboutPage';
import SkillsPage from './SkillsPage';
import ExperiencePage from './ExperiencePage';
import ContactPage from './ContactPage';
import ResumePage from './ResumePage';
import DropMessageSection from './DropMessageSection';
import {
  LogoIcon,
  DownloadIcon,
  MoonIcon,
  SunIcon,
  ArrowRightIcon,
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  UserIcon,
  CodeIcon,
  BriefcaseIcon,
  MouseScrollIcon,
  SqlIcon,
  PythonIcon,
  PowerBiIcon,
  TableauIcon,
  ExcelIcon,
} from './Icons';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeNav, setActiveNav] = useState('home');
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/projects') return 'projects';
      if (window.location.pathname === '/about') return 'about';
      if (window.location.pathname === '/skills') return 'skills';
      if (window.location.pathname === '/experience') return 'experience';
      if (window.location.pathname === '/contact') return 'contact';
      if (window.location.pathname === '/resume') return 'resume';
    }
    return 'home';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/projects') {
        setCurrentPage('projects');
      } else if (window.location.pathname === '/about') {
        setCurrentPage('about');
      } else if (window.location.pathname === '/skills') {
        setCurrentPage('skills');
      } else if (window.location.pathname === '/experience') {
        setCurrentPage('experience');
      } else if (window.location.pathname === '/contact') {
        setCurrentPage('contact');
      } else if (window.location.pathname === '/resume') {
        setCurrentPage('resume');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const navigateTo = (page, sectionId = null) => {
    if (page === 'projects') {
      window.history.pushState({}, '', '/projects');
      setCurrentPage('projects');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (page === 'about') {
      window.history.pushState({}, '', '/about');
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (page === 'skills') {
      window.history.pushState({}, '', '/skills');
      setCurrentPage('skills');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (page === 'experience') {
      window.history.pushState({}, '', '/experience');
      setCurrentPage('experience');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (page === 'contact') {
      window.history.pushState({}, '', '/contact');
      setCurrentPage('contact');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (page === 'resume') {
      window.history.pushState({}, '', '/resume');
      setCurrentPage('resume');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.history.pushState({}, '', '/');
      setCurrentPage('home');
      if (sectionId && sectionId !== 'home') {
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (id) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dedicated skills for Fresher Data Analyst
  const skills = [
    { name: 'SQL (PostgreSQL / MySQL)', icon: <SqlIcon size={20} />, level: '95%' },
    { name: 'Python (Pandas, NumPy)', icon: <PythonIcon size={20} />, level: '90%' },
    { name: 'Power BI & DAX', icon: <PowerBiIcon size={20} />, level: '88%' },
    { name: 'Tableau Desktop', icon: <TableauIcon size={20} />, level: '85%' },
    { name: 'Advanced Excel & Stats', icon: <ExcelIcon size={20} />, level: '92%' },
  ];

  // Landing page preview projects for Fresher Data Analyst
  const projects = [
    {
      title: 'Customer Churn Prediction',
      description: 'Predictive retention analysis with 84.2% ROC-AUC on 7k records.',
      stack: 'Python • Scikit-Learn • SQL',
      thumbnail: '/project-churn.svg',
    },
    {
      title: 'E-Commerce Sales & RFM BI',
      description: 'DAX measures & RFM segmentation over 120k sales records.',
      stack: 'Power BI • PostgreSQL • DAX',
      thumbnail: '/project-sales-bi.svg',
    },
    {
      title: 'Supply Chain Delay Analytics',
      description: 'ANOVA hypothesis testing & turnaround route optimization.',
      stack: 'Tableau • Python • Statistics',
      thumbnail: '/project-supplychain.svg',
    },
  ];

  // If user navigated to the dedicated Experience page
  if (currentPage === 'experience') {
    return (
      <ExperiencePage
        onNavigate={(target) => {
          if (target === 'projects') navigateTo('projects');
          else if (target === 'about') navigateTo('about');
          else if (target === 'skills') navigateTo('skills');
          else if (target === 'experience') navigateTo('experience');
          else if (target === 'contact') navigateTo('contact');
          else if (target === 'resume') navigateTo('resume');
          else if (target === 'home') navigateTo('home');
          else navigateTo('home', target);
        }}
      />
    );
  }

  // If user navigated to the dedicated Skills page
  if (currentPage === 'skills') {
    return (
      <SkillsPage
        onNavigate={(target) => {
          if (target === 'projects') navigateTo('projects');
          else if (target === 'about') navigateTo('about');
          else if (target === 'skills') navigateTo('skills');
          else if (target === 'experience') navigateTo('experience');
          else if (target === 'contact') navigateTo('contact');
          else if (target === 'resume') navigateTo('resume');
          else if (target === 'home') navigateTo('home');
          else navigateTo('home', target);
        }}
      />
    );
  }

  // If user navigated to the dedicated About page
  if (currentPage === 'about') {
    return (
      <AboutPage
        onNavigate={(target) => {
          if (target === 'projects') navigateTo('projects');
          else if (target === 'about') navigateTo('about');
          else if (target === 'skills') navigateTo('skills');
          else if (target === 'experience') navigateTo('experience');
          else if (target === 'contact') navigateTo('contact');
          else if (target === 'resume') navigateTo('resume');
          else if (target === 'home') navigateTo('home');
          else navigateTo('home', target);
        }}
      />
    );
  }

  // If user navigated to the dedicated Projects page
  if (currentPage === 'projects') {
    return (
      <ProjectsPage
        onNavigate={(target) => {
          if (target === 'projects') navigateTo('projects');
          else if (target === 'about') navigateTo('about');
          else if (target === 'skills') navigateTo('skills');
          else if (target === 'experience') navigateTo('experience');
          else if (target === 'contact') navigateTo('contact');
          else if (target === 'resume') navigateTo('resume');
          else if (target === 'home') navigateTo('home');
          else navigateTo('home', target);
        }}
      />
    );
  }

  // If user navigated to the dedicated Contact page
  if (currentPage === 'contact') {
    return (
      <ContactPage
        onNavigate={(target) => {
          if (target === 'projects') navigateTo('projects');
          else if (target === 'about') navigateTo('about');
          else if (target === 'skills') navigateTo('skills');
          else if (target === 'experience') navigateTo('experience');
          else if (target === 'contact') navigateTo('contact');
          else if (target === 'resume') navigateTo('resume');
          else if (target === 'home') navigateTo('home');
          else navigateTo('home', target);
        }}
      />
    );
  }

  // If user navigated to the dedicated Resume page
  if (currentPage === 'resume') {
    return (
      <ResumePage
        onNavigate={(target) => {
          if (target === 'projects') navigateTo('projects');
          else if (target === 'about') navigateTo('about');
          else if (target === 'skills') navigateTo('skills');
          else if (target === 'experience') navigateTo('experience');
          else if (target === 'contact') navigateTo('contact');
          else if (target === 'resume') navigateTo('resume');
          else if (target === 'home') navigateTo('home');
          else navigateTo('home', target);
        }}
      />
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Fixed Smooth Scroll Canvas Animation (developer video sequence) */}
      <SmoothScrollAnimation totalFrames={299} damping={0.09} />

      {/* Main Content Layer */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* Unified Responsive Navigation Bar */}
        <Navbar
          activeNav={activeNav}
          currentPage={currentPage}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNavigate={(target) => {
            if (target === 'projects') navigateTo('projects');
            else if (target === 'about') navigateTo('about');
            else if (target === 'skills') navigateTo('skills');
            else if (target === 'experience') navigateTo('experience');
            else if (target === 'contact') navigateTo('contact');
            else if (target === 'resume') navigateTo('resume');
            else if (target === 'home') navigateTo('home');
            else scrollToSection(target);
          }}
        />

        {/* Hero Section */}
        <section
          id="home"
          className="hero-container"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '120px 24px 60px 24px',
            maxWidth: '1240px',
            margin: '0 auto',
          }}
        >
          {/* Hero Content Left - Clean typography over canvas */}
          <div
            style={{
              maxWidth: '580px',
              zIndex: 2,
            }}
          >
            {/* Inline Freelance Badge on Mobile (< 900px) */}
            <div className="hero-badge-mobile" style={{ display: 'none' }}>
              <div className="freelance-badge" style={{ animation: 'none' }}>
                <span className="status-dot" />
                <span>Open to Analyst Roles</span>
              </div>
            </div>

            <p
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                color: 'var(--text-hero-muted)',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Hi there! <span>👋</span>, I'm
            </p>

            <h1
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '6px',
                color: 'var(--text-hero-title)',
              }}
            >
              Anant Singh
            </h1>

            <h2
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--accent-orange)',
                marginBottom: '22px',
              }}
            >
              Data Analyst
            </h2>

            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.65,
                color: 'var(--text-hero-sub)',
                marginBottom: '34px',
                maxWidth: '520px',
              }}
            >
              Aspiring Data Analyst skilled in taking messy, chaotic datasets and transforming them into
              clean, reliable stories that help teams make confident business decisions.
            </p>

            {/* CTA Buttons */}
            <div
              className="hero-btn-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '38px',
              }}
            >
              <button
                type="button"
                onClick={() => navigateTo('projects')}
                className="btn-primary"
                style={{ cursor: 'pointer' }}
              >
                <span>Explore All Projects</span>
                <ArrowRightIcon size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('about')}
                className="btn-hero-contact"
                style={{ cursor: 'pointer' }}
              >
                <span>About My Journey</span>
                <UserIcon size={16} />
              </button>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-hero-muted)',
                }}
              >
                Find me on
              </span>

              <a
                href="https://github.com/Aravanant"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn social-github"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/anant-singh-se"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn social-linkedin"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn social-twitter"
                aria-label="Twitter / X"
              >
                <TwitterIcon size={16} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn social-instagram"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Floating Badge (Top-Right on Hero on Desktop) */}
          <div
            className="hero-badge-desktop"
            style={{
              position: 'absolute',
              right: '24px',
              top: '200px',
              zIndex: 3,
            }}
          >
            <div className="freelance-badge">
              <span className="status-dot" />
              <span>Open to Analyst Roles</span>
            </div>
          </div>

          {/* Mouse Scroll Indicator (Centered at Bottom of Hero) */}
          <div
            className="hero-scroll-indicator"
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 4,
            }}
            onClick={() => scrollToSection('about')}
          >
            <div className="scroll-wheel-anim">
              <MouseScrollIcon size={26} />
            </div>
          </div>
        </section>

        {/* Main Sections (About Me • Skills • Projects) - Transparent, content directly on background */}
        <section
          id="about"
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '40px 24px 60px 24px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div className="sections-card">
            <div
              className="responsive-grid-320"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '40px',
              }}
            >
              {/* Column 1: About Me */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px',
                  }}
                >
                  <div className="section-icon-box">
                    <UserIcon size={20} color="#f97316" />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'var(--card-text-title)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    About Me
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: '0.98rem',
                    lineHeight: 1.7,
                    color: 'var(--card-text-body)',
                    marginBottom: '16px',
                  }}
                >
                  Hi, I'm <strong style={{ color: 'var(--card-text-title)' }}>Anant Singh</strong>! 👋 I love diving into data, but what I enjoy even more is using it to solve real business riddles. I don't just see rows of numbers—I see a puzzle waiting to be solved.
                </p>

                <p
                  style={{
                    fontSize: '0.98rem',
                    lineHeight: 1.7,
                    color: 'var(--card-text-body)',
                    marginBottom: '32px',
                  }}
                >
                  As an aspiring Data Analyst, I specialize in taking messy datasets and transforming them into clean, reliable stories using SQL, Python, Power BI, and Tableau.
                </p>

                <div style={{ marginTop: 'auto' }}>
                  <button
                    type="button"
                    onClick={() => navigateTo('about')}
                    className="btn-card-outline"
                    style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span>Read Full Story &amp; Tech Stack</span>
                    <ArrowRightIcon size={15} />
                  </button>
                </div>
              </div>

              {/* Column 2: Skills */}
              <div id="skills" style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px',
                  }}
                >
                  <div className="section-icon-box">
                    <CodeIcon size={20} color="#f97316" />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'var(--card-text-title)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Core Skills
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                      }}
                    >
                      {/* Icon & Name */}
                      <div
                        className="home-skill-name"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          minWidth: '100px',
                          maxWidth: '175px',
                          flex: '0 1 auto',
                        }}
                      >
                        {skill.icon}
                        <span
                          style={{
                            fontSize: '0.92rem',
                            fontWeight: 600,
                            color: 'var(--card-text-title)',
                          }}
                        >
                          {skill.name}
                        </span>
                      </div>

                      {/* Progress Bar Track */}
                      <div className="skill-bar-track">
                        <div
                          className="skill-bar-fill"
                          style={{ width: skill.level }}
                        />
                      </div>

                      {/* Percentage Number */}
                      <span
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: 'var(--card-text-title)',
                          width: '38px',
                          textAlign: 'right',
                          flexShrink: 0,
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Explore Full Skills Button */}
                <div style={{ marginTop: 'auto', paddingTop: '18px' }}>
                  <button
                    type="button"
                    onClick={() => navigateTo('skills')}
                    className="btn-card-outline"
                    style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span>Explore Full Skills &amp; Methodology</span>
                    <ArrowRightIcon size={15} />
                  </button>
                </div>
              </div>

              {/* Column 3: Projects Preview */}
              <div id="projects" style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="section-icon-box">
                      <BriefcaseIcon size={20} color="#f97316" />
                    </div>
                    <h3
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        color: 'var(--card-text-title)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Projects
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigateTo('projects')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--accent-orange)',
                      background: 'none',
                      border: 'none',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <span>View All</span>
                    <ArrowRightIcon size={14} />
                  </button>
                </div>

                {/* Projects List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {projects.map((proj) => (
                    <div
                      key={proj.title}
                      onClick={() => navigateTo('projects')}
                      className="project-card-item"
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={proj.thumbnail}
                        alt={proj.title}
                        className="project-thumb"
                      />
                      <div style={{ minWidth: 0 }}>
                        <h4
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            color: 'var(--card-text-title)',
                            marginBottom: '3px',
                          }}
                        >
                          {proj.title}
                        </h4>
                        <p
                          style={{
                            fontSize: '0.82rem',
                            color: 'var(--card-text-body)',
                            lineHeight: 1.4,
                            marginBottom: '4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {proj.description}
                        </p>
                        <p
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: 'var(--card-text-muted)',
                          }}
                        >
                          {proj.stack}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured FinTech Analytics & Dashboard Section (Experience) */}
        <DashboardSection />

        {/* Drop a Message Right Here Section from Contacts */}
        <DropMessageSection isStandalone={true} />

        {/* Footer */}
        <footer
          id="contact"
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '28px 24px 40px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            color: '#94a3b8',
            fontSize: '0.9rem',
          }}
        >
          <div>
            <span>© 2024 Anant Singh. All rights reserved.</span>
          </div>

          <div>
            <span>
              Data Analyst Portfolio • Crafted with <span style={{ color: '#ef4444' }}>❤️</span> by Anant Singh
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
