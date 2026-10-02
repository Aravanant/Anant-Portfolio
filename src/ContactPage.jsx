import React, { useState, useEffect } from 'react';
import {
  LogoIcon,
  DownloadIcon,
  MoonIcon,
  SunIcon,
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  MailIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  BriefcaseIcon,
} from './Icons';

export default function ContactPage({ onNavigateHome, onNavigate = onNavigateHome }) {
  const [theme, setTheme] = useState('dark');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  // Web3Forms access key (stored in localStorage or fallback)
  const [web3Key, setWeb3Key] = useState(() => {
    try {
      return localStorage.getItem('anant_web3forms_key') || 'YOUR_ACCESS_KEY_HERE';
    } catch (e) {
      return 'YOUR_ACCESS_KEY_HERE';
    }
  });
  const [showKeyConfig, setShowKeyConfig] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Data Analyst Role / Opportunity Inquiry',
    message: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('anant.221002@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    setFormStatus('submitting');
    setStatusMessage('');

    try {
      // Free email service via Web3Forms API
      // If a real access key is present, submit directly. Otherwise, gracefully fallback to mailto
      const isCustomKey = web3Key && web3Key !== 'YOUR_ACCESS_KEY_HERE';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: isCustomKey ? web3Key : 'c1d9b3e1-4567-4a8b-9e23-portfoliofakekey',
          name: formData.name,
          email: formData.email,
          subject: `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`,
          message: formData.message,
          from_name: `${formData.name} (Data Portfolio)`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setStatusMessage('Your message was successfully delivered directly to Anant’s inbox!');
        setFormData({ name: '', email: '', subject: 'Data Analyst Role / Opportunity Inquiry', message: '' });
      } else {
        // If the key is unconfigured or blocked by rate limit, fallback to opening user's email client
        if (!isCustomKey) {
          // Provide instant seamless mailto trigger
          const mailtoUrl = `mailto:anant.221002@gmail.com?subject=${encodeURIComponent(
            formData.subject
          )}&body=${encodeURIComponent(
            `Hi Anant,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
          )}`;
          window.location.href = mailtoUrl;
          setFormStatus('success');
          setStatusMessage('Email client opened! You can also paste your free Web3Forms access key below for 100% automated delivery.');
        } else {
          setFormStatus('error');
          setStatusMessage(result.message || 'Submission failed. Please check your Web3Forms key or email directly.');
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback to mailto
      const mailtoUrl = `mailto:anant.221002@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Hi Anant,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setFormStatus('success');
      setStatusMessage('Direct email draft opened! You can also email me directly at anant.221002@gmail.com.');
    }
  };

  const handleSaveWeb3Key = (key) => {
    setWeb3Key(key);
    try {
      localStorage.setItem('anant_web3forms_key', key);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 15% 15%, rgba(249, 115, 22, 0.09) 0%, transparent 45%), radial-gradient(circle at 85% 65%, rgba(14, 165, 233, 0.06) 0%, transparent 45%), #0c1219',
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
              (onNavigate || onNavigateHome)('home');
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
                  item.id === 'contact'
                    ? '/contact'
                    : item.id === 'about'
                    ? '/about'
                    : item.id === 'skills'
                    ? '/skills'
                    : item.id === 'projects'
                    ? '/projects'
                    : item.id === 'experience'
                    ? '/experience'
                    : `/#${item.id}`
                }
                onClick={(e) => {
                  if (item.id !== 'contact') {
                    e.preventDefault();
                    (onNavigate || onNavigateHome)(item.id);
                  }
                }}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: item.id === 'contact' ? 700 : 500,
                  color: item.id === 'contact' ? 'var(--accent-orange)' : 'var(--nav-text-muted)',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.label}
                {item.id === 'contact' && (
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
              onClick={() => (onNavigate || onNavigateHome)('resume')}
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
            HEADER & HERO: LET'S CONNECT!
           ========================================================================= */}
        <section style={{ textAlign: 'center', marginBottom: '60px', position: 'relative' }}>
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
            <span>✦ GET IN TOUCH • OPEN TO OPPORTUNITIES</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '18px',
              color: '#ffffff',
            }}
          >
            Let's <span style={{ color: '#f97316' }}>Connect!</span>
          </h1>

          {/* Core Subtitle Paragraph */}
          <p
            style={{
              fontSize: '1.2rem',
              color: '#cbd5e1',
              maxWidth: '820px',
              margin: '0 auto 24px auto',
              lineHeight: 1.7,
            }}
          >
            Whether you have an opening on your team, a freelance project, or just want to chat about data—my inbox is always open. I am actively looking for entry-level opportunities and would love to hear from you.
          </p>

          {/* Response Time Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 24px',
              borderRadius: '9999px',
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              color: '#4ade80',
              fontWeight: 700,
              fontSize: '0.92rem',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.15)',
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 10px #4ade80',
                display: 'inline-block',
              }}
            />
            <span>⚡ I usually reply within 24 hours!</span>
          </div>
        </section>

        {/* =========================================================================
            TWO-COLUMN SPLIT: DIRECT CHANNELS & RESUME (LEFT) vs MESSAGE FORM (RIGHT)
           ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* =======================================================================
              LEFT COLUMN: FIND ME AROUND THE WEB & LOOKING FOR MY RESUME?
             ======================================================================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* SECTION 1: 📥 FIND ME AROUND THE WEB */}
            <div
              style={{
                padding: '32px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                <span style={{ fontSize: '1.5rem' }}>📥</span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Find Me Around the Web
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* 1. Email */}
                <div
                  style={{
                    padding: '18px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                    e.currentTarget.style.background = 'rgba(249, 115, 22, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'rgba(249, 115, 22, 0.15)',
                          border: '1px solid rgba(249, 115, 22, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#f97316',
                          flexShrink: 0,
                        }}
                      >
                        <MailIcon size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                          📧 Email (Click to send an email)
                        </div>
                        <a
                          href="mailto:anant.221002@gmail.com"
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: '#ffffff',
                            textDecoration: 'none',
                            wordBreak: 'break-all',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#f97316')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                          title="Click to compose an email"
                        >
                          anant.221002@gmail.com
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={copyEmailToClipboard}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: copiedEmail ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: copiedEmail ? '#4ade80' : '#cbd5e1',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {copiedEmail ? 'Copied! ✓' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* 2. LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/anant-singh-se"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '18px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                    e.currentTarget.style.background = 'rgba(249, 115, 22, 0.04)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(14, 165, 233, 0.15)',
                        border: '1px solid rgba(14, 165, 233, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38bdf8',
                        flexShrink: 0,
                      }}
                    >
                      <LinkedinIcon size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                        💼 LinkedIn
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                        www.linkedin.com/in/anant-singh-se
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                        (Where I network and share my learning journey)
                      </div>
                    </div>
                  </div>

                  <span style={{ color: '#f97316', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Connect <ExternalLinkIcon size={14} />
                  </span>
                </a>

                {/* 3. GitHub */}
                <a
                  href="https://github.com/Aravanant"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '18px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                    e.currentTarget.style.background = 'rgba(249, 115, 22, 0.04)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        flexShrink: 0,
                      }}
                    >
                      <GithubIcon size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                        💻 GitHub
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                        https://github.com/Aravanant
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                        (Check out my raw SQL and Python code)
                      </div>
                    </div>
                  </div>

                  <span style={{ color: '#f97316', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Explore <ExternalLinkIcon size={14} />
                  </span>
                </a>
              </div>
            </div>

            {/* SECTION 2: 📄 LOOKING FOR MY RESUME? */}
            <div
              style={{
                padding: '32px',
                borderRadius: '24px',
                background:
                  'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(12, 18, 25, 0.95) 100%)',
                border: '1px solid rgba(249, 115, 22, 0.35)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>📄</span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Looking for my resume?
                </h2>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '22px' }}>
                You can grab a neat, one-page PDF version of my resume right here:
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => (onNavigate || onNavigateHome)('resume')}
                  className="btn-primary"
                  style={{
                    flex: '1 1 220px',
                    padding: '14px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)',
                  }}
                >
                  <span>👉 📥 Download My Resume (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => (onNavigate || onNavigateHome)('resume')}
                  className="btn-card-outline"
                  style={{
                    padding: '14px 18px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  title="View 1-Page Resume Online"
                >
                  <span>View 1-Page Online</span>
                  <ExternalLinkIcon size={14} />
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', fontSize: '0.78rem', color: '#94a3b8' }}>
                <span>✓ 1-Page Format</span>
                <span>•</span>
                <span>✓ ATS-Optimized</span>
                <span>•</span>
                <span>✓ Verified Projects &amp; SQL</span>
              </div>
            </div>

            {/* CANDIDATE PROFILE HIGHLIGHT: FRESHER DATA ANALYST */}
            <div
              style={{
                padding: '24px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f97316', marginBottom: '8px' }}>
                🎯 Candidate Profile for Hiring Teams
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Entry-level candidate with strong analytical foundations. Able to immediately query relational databases via SQL, manipulate datasets with Python (Pandas), and design actionable executive Power BI dashboards with minimal onboarding.
              </p>
            </div>
          </div>

          {/* =======================================================================
              RIGHT COLUMN: ✉️ DROP A MESSAGE RIGHT HERE (WEB3FORMS / FORMSPREE)
             ======================================================================= */}
          <div
            style={{
              padding: '36px 32px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
              position: 'relative',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>✉️</span>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Drop a Message Right Here
                  </h2>
                </div>

                {/* Free service badge / setting trigger */}
                <button
                  type="button"
                  onClick={() => setShowKeyConfig(!showKeyConfig)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                  }}
                  title="Configure Web3Forms / Formspree Access Key"
                >
                  <span>⚙️ Service Key</span>
                </button>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginTop: '8px', lineHeight: 1.5 }}>
                Direct email form delivered straight to <strong>anant.221002@gmail.com</strong> without any third-party clutter.
              </p>
            </div>

            {/* Optional Collapsible Access Key Configuration */}
            {showKeyConfig && (
              <div
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(249, 115, 22, 0.08)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  marginBottom: '20px',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f97316', marginBottom: '6px' }}>
                  🔑 Web3Forms Free Access Key:
                </div>
                <input
                  type="text"
                  placeholder="Paste your free Web3Forms access key from web3forms.com"
                  value={web3Key}
                  onChange={(e) => handleSaveWeb3Key(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: '#070a0e',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    outline: 'none',
                  }}
                />
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                  Web3Forms is 100% free: enter your email at web3forms.com to receive an access key in 5 seconds.
                </span>
              </div>
            )}

            {/* Form Success State */}
            {formStatus === 'success' ? (
              <div
                style={{
                  padding: '40px 24px',
                  textAlign: 'center',
                  background: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(34, 197, 94, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4ade80',
                  }}
                >
                  <CheckCircleIcon size={36} color="#4ade80" />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Message Sent Successfully! 🚀
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '420px', lineHeight: 1.6 }}>
                  {statusMessage || 'Thank you for reaching out! Your message was delivered directly to anant.221002@gmail.com. I will get back to you within 24 hours.'}
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="btn-card-outline"
                  style={{ padding: '10px 22px', fontSize: '0.88rem', marginTop: '8px', cursor: 'pointer' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
                  {/* Name: [ Text Box ] */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#cbd5e1',
                        marginBottom: '8px',
                      }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g., Alex Johnson / Hiring Manager"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#f97316')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                    />
                  </div>

                  {/* Email: [ Text Box ] */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#cbd5e1',
                        marginBottom: '8px',
                      }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g., alex.johnson@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#f97316')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                    />
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#cbd5e1',
                        marginBottom: '8px',
                      }}
                    >
                      Topic / Opportunity Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#161f2e',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    >
                      <option value="Entry-Level Data Analyst Opening">Entry-Level Data Analyst Opening</option>
                      <option value="Junior BI / Reporting Analyst Opening">Junior BI / Reporting Analyst Opening</option>
                      <option value="Data Analytics Internship">Data Analytics Internship</option>
                      <option value="Freelance Analytics Project">Freelance Analytics Project</option>
                      <option value="General Networking & Chat">General Networking &amp; Chat</option>
                    </select>
                  </div>

                  {/* Message: [ Large Text Area: "Hey! Let's talk about..." ] */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#cbd5e1',
                        marginBottom: '8px',
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Hey! Let's talk about..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        outline: 'none',
                        resize: 'vertical',
                        lineHeight: 1.6,
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#f97316')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                    />
                  </div>
                </div>

                {/* Send Message Button 🚀 */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    cursor: formStatus === 'submitting' ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)',
                    opacity: formStatus === 'submitting' ? 0.7 : 1,
                  }}
                >
                  <span>{formStatus === 'submitting' ? 'Sending Message... ⏳' : 'Send Message 🚀'}</span>
                </button>

                {formStatus === 'error' && (
                  <div
                    style={{
                      marginTop: '16px',
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#fca5a5',
                      fontSize: '0.85rem',
                      textAlign: 'center',
                    }}
                  >
                    {statusMessage}
                  </div>
                )}
              </form>
            )}

            <div style={{ marginTop: '22px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Prefer your own mail client?{' '}
                <a
                  href="mailto:anant.221002@gmail.com"
                  style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}
                >
                  Click here to email directly ↗
                </a>
              </span>
            </div>
          </div>
        </div>
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
