import React, { useState, useEffect } from 'react';
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
  SqlIcon,
  PythonIcon,
  PowerBiIcon,
  TableauIcon,
  ExcelIcon,
} from './Icons';

export default function AboutPage({ onNavigate }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 15% 15%, rgba(249, 115, 22, 0.08) 0%, transparent 45%), radial-gradient(circle at 85% 65%, rgba(14, 165, 233, 0.05) 0%, transparent 45%), #0c1219',
        color: '#ffffff',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Navigation Bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(12, 18, 25, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            <LogoIcon size={26} color="#f97316" />
            <span>DataPortfolio</span>
          </a>

          {/* Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav"
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Experience' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={
                  item.id === 'about'
                    ? '/about'
                    : item.id === 'skills'
                    ? '/skills'
                    : item.id === 'projects'
                    ? '/projects'
                    : item.id === 'experience'
                    ? '/experience'
                    : item.id === 'contact'
                    ? '/contact'
                    : `/#${item.id}`
                }
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: item.id === 'about' ? 700 : 500,
                  color: item.id === 'about' ? 'var(--accent-orange)' : 'var(--nav-text-muted)',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {item.label}
                {item.id === 'about' && (
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
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('resume')}
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <DownloadIcon size={16} />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '120px 24px 80px 24px' }}>
        {/* =========================================================================
            SECTION 1: TITLE & SUBTEXT REGARDING THIS PAGE
           ========================================================================= */}
        <section style={{ textAlign: 'center', marginBottom: '70px', position: 'relative' }}>
          {/* Subtle Top Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 20px',
              borderRadius: '9999px',
              background: 'rgba(249, 115, 22, 0.12)',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              color: '#f97316',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            <span>✦ ASPIRING DATA ANALYST • ABOUT ANANT SINGH</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '18px',
              color: '#ffffff',
            }}
          >
            Curious Problem-Solver.{' '}
            <span style={{ color: '#f97316' }}>Solving Business Riddles with Data.</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: '1.2rem',
              color: '#cbd5e1',
              maxWidth: '820px',
              margin: '0 auto 36px auto',
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            Hi, I'm <strong style={{ color: '#ffffff', fontWeight: 800 }}>Anant Singh</strong>! 👋
            I love diving into data, but what I enjoy even more is using it to solve real business riddles.
            Explore my journey, hands-on toolkit, and how I bridge technical analysis with human decision-making.
          </p>

          {/* Quick Core Strengths Snapshot Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '18px',
              maxWidth: '1040px',
              margin: '0 auto',
            }}
          >
            {[
              {
                title: 'Data Curiosity',
                subtitle: 'Sees puzzles, not just numbers',
                highlight: 'Problem-Solver',
              },
              {
                title: 'Hands-On Stack',
                subtitle: 'SQL • Python • Power BI • Tableau',
                highlight: 'Modern Tooling',
              },
              {
                title: 'Human Communication',
                subtitle: 'Actionable clarity for stakeholders',
                highlight: 'Bridge the Gap',
              },
              {
                title: 'Day-One Value',
                subtitle: 'Rapid learner eager to make impact',
                highlight: 'Entry-Level Ready',
              },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '20px 18px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#f97316',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '6px',
                  }}
                >
                  {stat.highlight}
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  {stat.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: MY STORY & THE "WHY DATA?" JOURNEY
           ========================================================================= */}
        <section style={{ marginBottom: '80px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              alignItems: 'stretch',
            }}
          >
            {/* Left Card: Who I Am & Quick Details */}
            <div
              style={{
                padding: '36px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Status Pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(34, 197, 94, 0.12)',
                    border: '1px solid rgba(34, 197, 94, 0.35)',
                    color: '#4ade80',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    marginBottom: '24px',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#22c55e',
                      boxShadow: '0 0 10px #22c55e',
                    }}
                  />
                  <span>Actively Seeking Entry-Level Role</span>
                </div>

                <h3
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '8px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Anant Singh
                </h3>

                <p
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#f97316',
                    marginBottom: '20px',
                  }}
                >
                  Fresher Data Analyst
                </p>

                <p
                  style={{
                    fontSize: '0.96rem',
                    color: '#cbd5e1',
                    lineHeight: 1.65,
                    marginBottom: '24px',
                  }}
                >
                  Passionate about exploratory data analysis, data storytelling, and crafting intuitive dashboards that drive business performance.
                </p>

                {/* Profile Fact Sheet */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Role Focus', value: 'Data Analyst / Junior BI Analyst' },
                    { label: 'Core Strengths', value: 'SQL, Python EDA, Power BI & Tableau' },
                    { label: 'Work Style', value: 'Curious, Detail-Driven & Collaborative' },
                    { label: 'Availability', value: 'Immediate / Full-Time' },
                  ].map((fact, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        fontSize: '0.88rem',
                      }}
                    >
                      <span style={{ color: '#94a3b8', fontWeight: 600 }}>{fact.label}:</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '28px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-btn social-github"
                  aria-label="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href="https://linkedin.com"
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
                  aria-label="Twitter"
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
                <a
                  href="mailto:contact@anantsingh.com"
                  className="social-icon-btn"
                  aria-label="Email"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <MailIcon size={16} />
                </a>
              </div>
            </div>

            {/* Right Card: Full Narrative Breakdown */}
            <div
              style={{
                padding: '36px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '18px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  How I See Data: The Puzzle Behind the Numbers
                </h3>

                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.75,
                    color: '#cbd5e1',
                    marginBottom: '20px',
                  }}
                >
                  My journey into data analytics started because I’ve always been a curious problem-solver.
                  I don't just see rows of numbers—<strong>I see a puzzle waiting to be solved</strong>.
                  As an aspiring Data Analyst, I specialize in taking messy, chaotic datasets and transforming
                  them into clean, reliable stories that help teams make confident decisions.
                </p>

                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.75,
                    color: '#cbd5e1',
                    marginBottom: '24px',
                  }}
                >
                  While I am just starting my professional career, I have spent countless hours hands-on with
                  the modern data stack. I know how to extract the exact data I need using <strong>SQL</strong>,
                  clean it up and find deep trends with <strong>Python</strong>, and turn it into highly interactive,
                  easy-to-read dashboards using <strong>Power BI and Tableau</strong>.
                </p>

                {/* Highlighted Quote Callout */}
                <div
                  style={{
                    padding: '22px 24px',
                    borderRadius: '16px',
                    background: 'rgba(249, 115, 22, 0.08)',
                    borderLeft: '4px solid #f97316',
                    marginBottom: '24px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '1.08rem',
                      fontStyle: 'italic',
                      color: '#ffffff',
                      lineHeight: 1.65,
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    “I thrive at the intersection of technical skills and human communication.
                    For me, a dashboard is only successful if a non-technical stakeholder can look at it
                    and instantly understand what step to take next.”
                  </p>
                </div>

                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.75,
                    color: '#cbd5e1',
                    marginBottom: '0',
                  }}
                >
                  Right now, I am looking for an <strong>entry-level Data Analyst role</strong> where I can
                  jump right into the deep end, learn rapidly from a great team, and start delivering value from day one.
                </p>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '16px',
                  marginTop: '32px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="btn-primary"
                  style={{ cursor: 'pointer', padding: '10px 22px' }}
                >
                  <span>See How I Apply This in Projects</span>
                  <ArrowRightIcon size={16} />
                </button>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
                  className="btn-card-outline"
                  style={{ padding: '10px 20px' }}
                >
                  <span>Get in Touch</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: TOOLS & TECH STACK (DEEP DIVE CARDS)
           ========================================================================= */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 16px',
                borderRadius: '9999px',
                background: 'rgba(249, 115, 22, 0.12)',
                border: '1px solid rgba(249, 115, 22, 0.35)',
                color: '#f97316',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '12px',
              }}
            >
              <span>✦ TECHNICAL TOOLKIT</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '10px',
              }}
            >
              My Tools &amp; Tech Stack
            </h2>

            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto' }}>
              Hand-picked technologies mastered through practical end-to-end data analysis workflows,
              from relational extraction to executive visual delivery.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Card 1: Databases & Querying */}
            <div
              style={{
                padding: '28px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(249, 115, 22, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SqlIcon size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                    Databases &amp; Querying
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: '#f97316', fontWeight: 700 }}>
                    Relational Data Architecture
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(249, 115, 22, 0.08)',
                  border: '1px solid rgba(249, 115, 22, 0.2)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                SQL (CTEs, Joins, Subqueries)
              </div>

              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
                Extracting exact records from complex normalized relational schemas. Writing optimized Common Table Expressions (CTEs), multi-table JOINs, subqueries, and window functions to answer critical business questions without bottlenecking database servers.
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['CTEs', 'Inner & Outer Joins', 'Subqueries', 'Window Functions', 'GROUP BY & Aggregations', 'PostgreSQL / MySQL'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#94a3b8',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2: Programming & Cleaning */}
            <div
              style={{
                padding: '28px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PythonIcon size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                    Programming &amp; Cleaning
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                    Automated Data Wrangling
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                Python (Pandas, NumPy)
              </div>

              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
                Cleaning chaotic datasets with Pandas and NumPy. Handling missing values, type coercions, outlier identification, and statistical distribution checks before feeding clean data into analytical models and dashboards.
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Pandas DataFrames', 'NumPy Arrays', 'Handling Nulls', 'Outlier Detection', 'Data Profiling', 'Matplotlib & Seaborn'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#94a3b8',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3: Deep Dives & Spreadsheets */}
            <div
              style={{
                padding: '28px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(16, 124, 65, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(16, 124, 65, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ExcelIcon size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                    Deep Dives &amp; Spreadsheets
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>
                    Fast Ad-Hoc Modeling
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(16, 124, 65, 0.08)',
                  border: '1px solid rgba(16, 124, 65, 0.2)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                Microsoft Excel (VLOOKUPs, Pivot Tables)
              </div>

              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
                Executing rapid exploratory deep dives with Microsoft Excel. Building dynamic Pivot Tables, multi-condition lookups (VLOOKUP, XLOOKUP, INDEX/MATCH), and audit checks to quickly validate hypotheses before scaling them to pipelines.
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Pivot Tables', 'VLOOKUP / XLOOKUP', 'Conditional Logic', 'Data Validation', 'Descriptive Stats', 'What-If Scenarios'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#94a3b8',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 4: Visual Storytelling */}
            <div
              style={{
                padding: '28px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PowerBiIcon size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                    Visual Storytelling
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700 }}>
                    Executive Decision Dashboards
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                Power BI, Tableau Public
              </div>

              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
                Transforming multi-dimensional numbers into glanceable visual stories. Authoring custom DAX formulas, interactive slicers, drill-down parameters, and Tableau storyboards that let non-technical stakeholders instantly spot anomalies and next steps.
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Power BI Dashboards', 'Tableau Public Stories', 'DAX Measures', 'Interactive Slicers', 'Star-Schema Modeling', 'Executive KPIs'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#94a3b8',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: WHAT I BRING AS A FRESHER DATA ANALYST (DAY-ONE VALUE)
           ========================================================================= */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '10px',
              }}
            >
              Why Hire Anant? What I Bring from Day One
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto' }}>
              The distinct advantage of bringing an ambitious, rigorously prepared fresher data analyst onto your team.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                step: '01',
                title: 'High Learning Velocity',
                desc: 'No legacy habits to unlearn. I absorb internal data architectures, business metrics, and team conventions rapidly, ramping up to full productivity with agility.',
              },
              {
                step: '02',
                title: 'Data Skepticism & Rigor',
                desc: 'I verify schema integrity, check for null traps, and validate edge cases before reporting. Clean data integrity is a non-negotiable standard.',
              },
              {
                step: '03',
                title: 'Empathy for Non-Tech Stakeholders',
                desc: 'A metric without context is meaningless. I focus relentlessly on clarity—delivering recommendations in straightforward language that managers can act on.',
              },
              {
                step: '04',
                title: 'Hunger & Dedication',
                desc: 'Passionate about taking ownership of backlog tickets, repetitive queries, and dashboard builds to immediately alleviate workload from senior analysts.',
              },
            ].map((col, i) => (
              <div
                key={i}
                style={{
                  padding: '28px 22px',
                  borderRadius: '18px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f97316', marginBottom: '12px' }}>
                  {col.step}
                </div>
                <h4 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                  {col.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: CALL TO ACTION BANNER
           ========================================================================= */}
        <section style={{ marginBottom: '40px' }}>
          <div
            style={{
              padding: '48px 36px',
              borderRadius: '24px',
              background:
                'linear-gradient(135deg, rgba(249, 115, 22, 0.14) 0%, rgba(12, 18, 25, 0.95) 100%)',
              border: '1px solid rgba(249, 115, 22, 0.35)',
              textAlign: 'center',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '14px',
                letterSpacing: '-0.02em',
              }}
            >
              Ready to Solve Business Riddles Together?
            </h3>

            <p
              style={{
                fontSize: '1.1rem',
                color: '#cbd5e1',
                maxWidth: '680px',
                margin: '0 auto 32px auto',
                lineHeight: 1.65,
              }}
            >
              I am actively interviewing for entry-level Data Analyst and Business Intelligence roles.
              Let's connect to discuss how I can bring value to your data team!
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
              }}
            >
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="btn-primary"
                style={{ padding: '12px 26px', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                <span>Explore My Projects</span>
                <ArrowRightIcon size={16} />
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="btn-hero-contact"
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
              >
                <span>Contact Anant</span>
                <MailIcon size={16} />
              </a>

              <button
                type="button"
                onClick={() => onNavigate('resume')}
                className="btn-card-outline"
                style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <DownloadIcon size={16} />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '28px 24px 40px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          color: '#cbd5e1',
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
  );
}
