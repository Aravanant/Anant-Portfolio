import React, { useState, useEffect } from 'react';
import {
  LogoIcon,
  DownloadIcon,
  MoonIcon,
  SunIcon,
  ArrowRightIcon,
  MailIcon,
  SqlIcon,
  PythonIcon,
  PowerBiIcon,
  TableauIcon,
  ExcelIcon,
  AwardIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
} from './Icons';

export default function SkillsPage({ onNavigate }) {
  const [theme, setTheme] = useState('dark');
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeAddTab, setActiveAddTab] = useState('form'); // 'form' | 'code'

  // Certificate input form state
  const [newCertForm, setNewCertForm] = useState({
    title: '',
    issuer: '',
    credentialId: '',
    issueDate: '',
    verificationUrl: '',
    skillsCovered: '',
    image: '',
  });

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const copyCredentialId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // =========================================================================
  // CERTIFICATES & CREDENTIALS DATA (SAFE & READY FOR FUTURE CERTIFICATES)
  // When you obtain real certificates, add them here or use the "+ Add Certificate" button.
  // Sample structure:
  // {
  //   id: 'cert-1',
  //   title: 'Microsoft Certified: Power BI Data Analyst Associate',
  //   issuer: 'Microsoft',
  //   credentialId: 'MS-PL300-XXXXX',
  //   issueDate: 'Issued 2024',
  //   verificationUrl: 'https://learn.microsoft.com/...',
  //   skillsCovered: ['Power BI', 'DAX', 'SQL', 'Data Modeling'],
  //   image: '/my-cert.png', // or .pdf in /public folder or uploaded file
  //   status: 'Verified',
  // }
  // =========================================================================
  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem('anant_portfolio_certificates');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Exclude legacy mock items if any existed in localStorage
        return parsed.filter(
          (c) =>
            !['cert-1', 'cert-2', 'cert-3'].includes(c.id) &&
            !c.title?.includes('Google Data Analytics') &&
            !c.title?.includes('Microsoft Certified: Power BI') &&
            !c.title?.includes('SQL (Advanced) Skills Assessment')
        );
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Sync added certificates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('anant_portfolio_certificates', JSON.stringify(certificates));
    } catch (e) {
      console.error(e);
    }
  }, [certificates]);

  // Handle adding a new certificate dynamically
  const handleAddCertificate = (e) => {
    e?.preventDefault();
    if (!newCertForm.title.trim()) return;

    const skillsArray = newCertForm.skillsCovered
      ? newCertForm.skillsCovered
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : ['Data Analytics'];

    const newEntry = {
      id: `cert-${Date.now()}`,
      title: newCertForm.title.trim(),
      issuer: newCertForm.issuer.trim() || 'Verified Issuer',
      credentialId: newCertForm.credentialId.trim() || 'VERIFIED-ID',
      issueDate: newCertForm.issueDate.trim() || new Date().getFullYear().toString(),
      verificationUrl: newCertForm.verificationUrl.trim() || '#',
      skillsCovered: skillsArray,
      image: newCertForm.image.trim() || '',
      status: 'Verified',
    };

    setCertificates((prev) => [...prev, newEntry]);
    setNewCertForm({
      title: '',
      issuer: '',
      credentialId: '',
      issueDate: '',
      verificationUrl: '',
      skillsCovered: '',
      image: '',
    });
    setShowAddModal(false);
  };

  // Handle removing a certificate
  const handleRemoveCertificate = (id, e) => {
    e?.stopPropagation();
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    if (selectedCert?.id === id) {
      setSelectedCert(null);
    }
  };

  // Handle file/image upload for certificate
  const handleCertificateUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewCertForm((prev) => ({
          ...prev,
          image: event.target?.result || '',
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const coreSkillsProficiency = [
    {
      name: 'SQL (PostgreSQL & MySQL)',
      level: '95%',
      icon: <SqlIcon size={22} />,
      highlight: 'CTEs, Complex Joins, Subqueries & Aggregations',
    },
    {
      name: 'Python (Pandas & NumPy)',
      level: '90%',
      icon: <PythonIcon size={22} />,
      highlight: 'Data Cleaning, EDA, Wrangling & Statistical Profiling',
    },
    {
      name: 'Microsoft Excel',
      level: '92%',
      icon: <ExcelIcon size={22} />,
      highlight: 'Pivot Tables, XLOOKUP, Dynamic Modeling & Formulas',
    },
    {
      name: 'Power BI',
      level: '88%',
      icon: <PowerBiIcon size={22} />,
      highlight: 'DAX Measures, Data Modeling & Executive Dashboards',
    },
    {
      name: 'Tableau Desktop & Public',
      level: '85%',
      icon: <TableauIcon size={22} />,
      highlight: 'Interactive Stories, Geospatial Maps & Visual Heatmaps',
    },
  ];

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
                  item.id === 'skills'
                    ? '/skills'
                    : item.id === 'about'
                    ? '/about'
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
                  fontWeight: item.id === 'skills' ? 700 : 500,
                  color: item.id === 'skills' ? 'var(--accent-orange)' : 'var(--nav-text-muted)',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {item.label}
                {item.id === 'skills' && (
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
            SECTION 1: TITLE & SUBTEXT REGARDING THIS PAGE + WHAT I BRING TO THE TABLE
           ========================================================================= */}
        <section style={{ textAlign: 'center', marginBottom: '64px', position: 'relative' }}>
          {/* Top Badge */}
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
            <span>✦ TECHNICAL CAPABILITIES • DATA ANALYST STACK</span>
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
            Making Sense of Numbers.{' '}
            <span style={{ color: '#f97316' }}>From Raw Data to Real Decisions.</span>
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
            A detailed breakdown of my hands-on technical competencies, database querying methods,
            data wrangling pipelines, and business intelligence reporting.
          </p>

          {/* Highlight Card: What I Bring to the Table */}
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              padding: '36px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(249, 115, 22, 0.35)',
              textAlign: 'left',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '6px',
                height: '100%',
                background: 'linear-gradient(to bottom, #f97316, #ea580c)',
              }}
            />

            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#f97316',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px',
              }}
            >
              Core Philosophy
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              What I Bring to the Table
            </h2>

            <p
              style={{
                fontSize: '1.12rem',
                color: '#ffffff',
                lineHeight: 1.7,
                marginBottom: '14px',
                fontWeight: 600,
              }}
            >
              I don’t just use tools. I use them to make sense of numbers.
            </p>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#cbd5e1',
                lineHeight: 1.7,
                marginBottom: '26px',
              }}
            >
              For me, data analytics is a journey: <strong>catching the data</strong>,{' '}
              <strong>cleaning up the noise</strong>, <strong>finding the hidden story</strong>, and{' '}
              <strong>showing it to the world</strong>. Here is the tech stack I use to make that happen.
            </p>

            {/* 4 Journey Steps Visual Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                gap: '14px',
              }}
            >
              {[
                { step: '01', title: 'Catching Data', desc: 'SQL queries, schemas & tables' },
                { step: '02', title: 'Cleaning Noise', desc: 'Python, Pandas & null audits' },
                { step: '03', title: 'Hidden Stories', desc: 'EDA, trends & distributions' },
                { step: '04', title: 'Showing World', desc: 'Power BI, Tableau & Excel' },
              ].map((pill, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.025)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f97316' }}>
                    {pill.step} • {pill.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                    {pill.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: CORE TECH STACK BREAKDOWN (THE 3 PRIMARY PILLARS)
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
              The Core Technical Pillars
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
              How I leverage each component of the modern data stack to deliver clean, fast, and actionable answers.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* 1. SQL & Databases */}
            <div
              style={{
                padding: '36px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
                alignItems: 'center',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
            >
              {/* Left Column: Details */}
              <div>
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
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'rgba(249, 115, 22, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SqlIcon size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                      🗄️ SQL &amp; Databases
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: '#f97316', fontWeight: 700 }}>
                      Relational Precision &amp; Efficient Ingestion
                    </span>
                  </div>
                </div>

                {/* Exact User Text Block */}
                <p
                  style={{
                    fontSize: '1.08rem',
                    color: '#ffffff',
                    lineHeight: 1.65,
                    marginBottom: '18px',
                    fontWeight: 600,
                  }}
                >
                  Data is everywhere, but you have to know how to ask for it. I write clean queries to pull exactly what a business needs. No clutter.
                </p>

                {/* Structured Breakdown Attributes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <strong style={{ color: '#f97316' }}>My Go-To:</strong>{' '}
                    <span style={{ color: '#ffffff' }}>SQL (MySQL &amp; PostgreSQL).</span>
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <strong style={{ color: '#f97316' }}>What I can do:</strong>{' '}
                    <span style={{ color: '#ffffff' }}>Write complex Joins, Subqueries, and CTEs.</span>
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(249, 115, 22, 0.08)',
                      border: '1px solid rgba(249, 115, 22, 0.25)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <strong style={{ color: '#f97316' }}>The Goal:</strong>{' '}
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>Keep queries fast and data well-organized.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Common Table Expressions (CTEs)', 'Inner & Outer Joins', 'Subqueries', 'Window Functions', 'Data Aggregations', 'GROUP BY & HAVING'].map(
                    (tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#cbd5e1',
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Right Column: Code / Query Snapshot Card */}
              <div
                style={{
                  background: '#080d13',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem', marginLeft: '6px' }}>customer_cohort_query.sql</span>
                </div>
                <div style={{ color: '#94a3b8' }}>-- Clean SQL with CTE &amp; Window Function</div>
                <div><span style={{ color: '#f97316' }}>WITH</span> monthly_user_spend <span style={{ color: '#f97316' }}>AS</span> (</div>
                <div style={{ paddingLeft: '16px' }}><span style={{ color: '#38bdf8' }}>SELECT</span> user_id, DATE_TRUNC(<span style={{ color: '#a7f3d0' }}>'month'</span>, txn_date) <span style={{ color: '#f97316' }}>AS</span> month,</div>
                <div style={{ paddingLeft: '16px' }}>SUM(amount) <span style={{ color: '#f97316' }}>AS</span> total_spent,</div>
                <div style={{ paddingLeft: '16px' }}>ROW_NUMBER() OVER(PARTITION <span style={{ color: '#f97316' }}>BY</span> user_id <span style={{ color: '#f97316' }}>ORDER BY</span> txn_date) <span style={{ color: '#f97316' }}>AS</span> txn_order</div>
                <div style={{ paddingLeft: '16px' }}><span style={{ color: '#38bdf8' }}>FROM</span> transactions</div>
                <div style={{ paddingLeft: '16px' }}><span style={{ color: '#38bdf8' }}>WHERE</span> status = <span style={{ color: '#a7f3d0' }}>'completed'</span></div>
                <div style={{ paddingLeft: '16px' }}><span style={{ color: '#38bdf8' }}>GROUP BY</span> user_id, month</div>
                <div>)</div>
                <div><span style={{ color: '#38bdf8' }}>SELECT</span> user_id, month, total_spent</div>
                <div><span style={{ color: '#38bdf8' }}>FROM</span> monthly_user_spend</div>
                <div><span style={{ color: '#38bdf8' }}>WHERE</span> txn_order = 1;</div>
              </div>
            </div>

            {/* 2. Python & Analytics */}
            <div
              style={{
                padding: '36px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
                alignItems: 'center',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
            >
              {/* Left Column: Details */}
              <div>
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
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'rgba(56, 189, 248, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PythonIcon size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                      🐍 Python &amp; Analytics
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700 }}>
                      Deep Data Mining &amp; Exploratory Analysis
                    </span>
                  </div>
                </div>

                {/* Exact User Text Block */}
                <p
                  style={{
                    fontSize: '1.08rem',
                    color: '#ffffff',
                    lineHeight: 1.65,
                    marginBottom: '18px',
                    fontWeight: 600,
                  }}
                >
                  When data gets huge or messy, I write code. Python is my favorite tool for digging deep into a dataset to see what's actually happening.
                </p>

                {/* Structured Breakdown Attributes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <strong style={{ color: '#38bdf8' }}>My Core Libraries:</strong>{' '}
                    <span style={{ color: '#ffffff' }}>Pandas and NumPy.</span>
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <strong style={{ color: '#38bdf8' }}>What I focus on:</strong>{' '}
                    <span style={{ color: '#ffffff' }}>Data cleaning and Exploratory Data Analysis (EDA).</span>
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <strong style={{ color: '#38bdf8' }}>The Goal:</strong>{' '}
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>Turn chaotic rows of data into structured, ready-to-use information.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Data Wrangling', 'Handling Missing Values', 'Outlier Detection (IQR)', 'Statistical Distributions', 'Seaborn & Matplotlib', 'Vectorized Operations'].map(
                    (tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#cbd5e1',
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Right Column: Code Snapshot Card */}
              <div
                style={{
                  background: '#080d13',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem', marginLeft: '6px' }}>clean_and_eda.py</span>
                </div>
                <div style={{ color: '#94a3b8' }}># Cleaning &amp; Filtering Outliers</div>
                <div><span style={{ color: '#38bdf8' }}>import</span> pandas <span style={{ color: '#38bdf8' }}>as</span> pd</div>
                <div><span style={{ color: '#38bdf8' }}>import</span> numpy <span style={{ color: '#38bdf8' }}>as</span> np</div>
                <br/>
                <div>df = pd.read_csv(<span style={{ color: '#a7f3d0' }}>'raw_transactions.csv'</span>)</div>
                <div>df = df.dropna(subset=[<span style={{ color: '#a7f3d0' }}>'revenue'</span>, <span style={{ color: '#a7f3d0' }}>'customer_id'</span>])</div>
                <div>q1, q3 = df[<span style={{ color: '#a7f3d0' }}>'revenue'</span>].quantile([<span style={{ color: '#f59e0b' }}>0.25</span>, <span style={{ color: '#f59e0b' }}>0.75</span>])</div>
                <div>iqr = q3 - q1</div>
                <div>clean_df = df[df[<span style={{ color: '#a7f3d0' }}>'revenue'</span>].between(q1 - <span style={{ color: '#f59e0b' }}>1.5</span>*iqr, q3 + <span style={{ color: '#f59e0b' }}>1.5</span>*iqr)]</div>
                <div>print(<span style={{ color: '#a7f3d0' }}>f"Cleaned records: &#123;len(clean_df)&#125;"</span>)</div>
              </div>
            </div>

            {/* 3. Excel & BI Dashboards */}
            <div
              style={{
                padding: '36px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
                alignItems: 'center',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
            >
              {/* Left Column: Details */}
              <div>
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
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'rgba(245, 158, 11, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PowerBiIcon size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                      📊 Excel &amp; BI Dashboards
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 700 }}>
                      Visual Reporting &amp; Executive Storytelling
                    </span>
                  </div>
                </div>

                {/* Exact User Text Block */}
                <p
                  style={{
                    fontSize: '1.08rem',
                    color: '#ffffff',
                    lineHeight: 1.65,
                    marginBottom: '18px',
                    fontWeight: 600,
                  }}
                >
                  A chart is useless if people can't understand it. I build visual reports that tell a story at a single glance.
                </p>

                {/* Structured Breakdown Attributes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <strong style={{ color: '#f59e0b' }}>The Visual Tools:</strong>{' '}
                    <span style={{ color: '#ffffff' }}>Power BI and Tableau.</span>
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <strong style={{ color: '#34d399' }}>The Spreadsheet Hero:</strong>{' '}
                    <span style={{ color: '#ffffff' }}>Microsoft Excel (Pivot Tables, XLOOKUP, formulas).</span>
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <strong style={{ color: '#f59e0b' }}>What I focus on:</strong>{' '}
                    <span style={{ color: '#ffffff' }}>Writing DAX measures, building data models, and creating interactive charts.</span>
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(245, 158, 11, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <strong style={{ color: '#f59e0b' }}>The Goal:</strong>{' '}
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>Help managers make smart choices without getting a headache.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['DAX Measures', 'Star-Schema Modeling', 'Tableau Stories', 'Excel Pivot Tables', 'XLOOKUP & Logic', 'Automated Slicers'].map(
                    (tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#cbd5e1',
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Right Column: Dashboard Card Preview */}
              <div
                style={{
                  background: '#080d13',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f97316' }}>Executive BI Scorecard</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>DAX Dynamic Measure</span>
                </div>

                {/* Mockup KPIs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>MoM Revenue Growth</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#22c55e', marginTop: '2px' }}>+18.4%</div>
                  </div>
                  <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Gross Margin Rate</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f97316', marginTop: '2px' }}>41.8%</div>
                  </div>
                </div>

                {/* Slicers indicator */}
                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px' }}>Active Filter Slicers:</div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(249,115,22,0.2)', color: '#f97316', fontWeight: 700 }}>FY 2024</span>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#cbd5e1' }}>Region: North America</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: 🧠 THE HUMAN SIDE (COMMUNICATION & PROBLEM-SOLVING)
           ========================================================================= */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
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
                marginBottom: '14px',
              }}
            >
              <span>✦ BEYOND THE CODE</span>
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
              🧠 The Human Side
            </h2>

            <p
              style={{
                fontSize: '1.25rem',
                color: '#ffffff',
                fontWeight: 700,
                maxWidth: '680px',
                margin: '0 auto 10px auto',
              }}
            >
              Numbers are only half the battle. The rest is communication.
            </p>

            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
              How I make sure technical insights actually influence decisions and create business value.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Human Pillar 1 */}
            <div
              style={{
                padding: '32px 28px',
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
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '18px',
                }}
              >
                💬
              </div>

              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                Simple Words, Not Code
              </h4>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#ffffff',
                  fontWeight: 600,
                  lineHeight: 1.6,
                  marginBottom: '10px',
                }}
              >
                “I talk to stakeholders in simple words, not code.”
              </p>

              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.65, marginTop: 'auto' }}>
                Non-technical leaders don't need to hear about database joins or syntax errors. They need clear answers: What happened? Why did it happen? And what should we do next?
              </p>
            </div>

            {/* Human Pillar 2 */}
            <div
              style={{
                padding: '32px 28px',
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
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '18px',
                }}
              >
                🧩
              </div>

              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                Solving Open-Ended Problems
              </h4>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#ffffff',
                  fontWeight: 600,
                  lineHeight: 1.6,
                  marginBottom: '10px',
                }}
              >
                “I love solving open-ended problems.”
              </p>

              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.65, marginTop: 'auto' }}>
                Real business questions rarely arrive with neat instructions. I embrace ambiguous questions, frame hypotheses, dig through the tables, and synthesize findings into concrete roadmaps.
              </p>
            </div>

            {/* Human Pillar 3 */}
            <div
              style={{
                padding: '32px 28px',
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
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '18px',
                }}
              >
                ⚡
              </div>

              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                Rapid Learning Velocity
              </h4>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#ffffff',
                  fontWeight: 600,
                  lineHeight: 1.6,
                  marginBottom: '10px',
                }}
              >
                “I learn fast. If your team uses a tool I don't know yet, I'll pick it up in no time.”
              </p>

              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.65, marginTop: 'auto' }}>
                Whether your team operates on BigQuery, Snowflake, dbt, or specialized internal tools, my strong foundations in data structures and logic ensure I become productive in days, not months.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: TECHNICAL PROFICIENCY MATRIX
           ========================================================================= */}
        <section style={{ marginBottom: '80px' }}>
          <div
            style={{
              padding: '36px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                Practical Tool Proficiency &amp; Comfort Level
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Self-assessed hands-on mastery applied across my academic and portfolio case studies.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {coreSkillsProficiency.map((item) => (
                <div key={item.name}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {item.icon}
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                        {item.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: '#94a3b8',
                          display: 'none',
                        }}
                        className="hide-mobile"
                      >
                        • {item.highlight}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f97316' }}>
                      {item.level}
                    </span>
                  </div>

                  {/* Progress Track */}
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: item.level,
                        height: '100%',
                        borderRadius: '9999px',
                        background: 'linear-gradient(to right, #f97316, #ea580c)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: CERTIFICATIONS & VERIFIED CREDENTIALS (NEW SECTION)
           ========================================================================= */}
        <section id="certifications" style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
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
                marginBottom: '14px',
              }}
            >
              <span>✦ VERIFIED CREDENTIALS • CONTINUOUS LEARNING</span>
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
              Certifications &amp; Professional Credentials
            </h2>

            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto' }}>
              Industry-recognized credentials validating practical competence in SQL, Python, Power BI, and data analytics.
              You can easily attach certificate files, images, or verification IDs anytime.
            </p>
          </div>

          {/* Certificates Showcase & Add Grid */}
          {certificates.length === 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                alignItems: 'stretch',
              }}
            >
              {/* Ready State / Credentials Vault Showcase Card */}
              <div
                style={{
                  padding: '32px 28px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      background: 'rgba(249, 115, 22, 0.12)',
                      border: '1px solid rgba(249, 115, 22, 0.3)',
                      color: '#f97316',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '16px',
                    }}
                  >
                    <AwardIcon size={14} color="#f97316" />
                    <span>Credentials Vault • Ready</span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '10px',
                      lineHeight: 1.3,
                    }}
                  >
                    Ready for Your Real Certificates
                  </h3>

                  <p
                    style={{
                      color: '#cbd5e1',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                    }}
                  >
                    This section is pre-configured and waiting to showcase your verified industry certifications (e.g., Microsoft Power BI, Google Data Analytics, SQL, Python, AWS, or Datacamp credentials).
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {[
                      { icon: '📄', label: 'File & Image Previews', desc: 'Direct high-resolution document and PDF viewing modal.' },
                      { icon: '🆔', label: '1-Click Credential ID', desc: 'Instant copy button for recruiter and hiring manager checks.' },
                      { icon: '🔗', label: 'Official Issuer Links', desc: 'Live external verification buttons for authenticated credentials.' },
                    ].map((feature) => (
                      <div
                        key={feature.label}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <span style={{ fontSize: '1.1rem' }}>{feature.icon}</span>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{feature.label}</div>
                          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>{feature.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="btn-primary"
                  style={{
                    padding: '12px 20px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <PlusIcon size={18} color="#000000" />
                  <span>+ Add Your First Certificate</span>
                </button>
              </div>

              {/* + Add New Certificate Action Card */}
              <div
                onClick={() => setShowAddModal(true)}
                style={{
                  padding: '32px 28px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '2px dashed rgba(249, 115, 22, 0.45)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  minHeight: '380px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(249, 115, 22, 0.06)';
                  e.currentTarget.style.borderColor = '#f97316';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.015)';
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.45)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.15)',
                    border: '1px solid rgba(249, 115, 22, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    boxShadow: '0 0 24px rgba(249, 115, 22, 0.2)',
                  }}
                >
                  <PlusIcon size={30} color="#f97316" />
                </div>

                <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                  + Add Certificate
                </h4>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#cbd5e1',
                    maxWidth: '300px',
                    lineHeight: 1.5,
                    marginBottom: '20px',
                  }}
                >
                  Attach your certificate image, document file, or official Credential ID.
                </p>

                <div
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    background: 'rgba(249, 115, 22, 0.12)',
                    border: '1px solid rgba(249, 115, 22, 0.4)',
                    color: '#f97316',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Click to Add Certificate</span>
                  <ArrowRightIcon size={14} />
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    padding: '24px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
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
                  {/* Certificate Thumbnail / Preview Image */}
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      marginBottom: '18px',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedCert(cert)}
                  >
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '180px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(12, 18, 25, 0.9) 100%)',
                          border: '1px solid rgba(249, 115, 22, 0.25)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                        }}
                      >
                        <AwardIcon size={36} color="#f97316" />
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f97316' }}>
                          Verified Credential
                        </span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'rgba(12, 18, 25, 0.85)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#4ade80',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                      }}
                    >
                      <CheckCircleIcon size={13} color="#4ade80" />
                      <span>{cert.status || 'Verified'}</span>
                    </div>
                  </div>

                  {/* Organization, Issue Date & Remove Button */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f97316' }}>
                      {cert.issuer}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {cert.issueDate}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleRemoveCertificate(cert.id, e)}
                        title="Remove Certificate"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0.6,
                          transition: 'opacity 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
                      >
                        <TrashIcon size={14} color="#ef4444" />
                      </button>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <h4
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      lineHeight: 1.35,
                      marginBottom: '12px',
                    }}
                  >
                    {cert.title}
                  </h4>

                  {/* Credential ID Copy Box */}
                  <div
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                        Credential ID
                      </span>
                      <span
                        style={{
                          fontSize: '0.82rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: '#cbd5e1',
                        }}
                      >
                        {cert.credentialId}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyCredentialId(cert.credentialId)}
                      style={{
                        background:
                          copiedId === cert.credentialId ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: copiedId === cert.credentialId ? '#4ade80' : '#cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {copiedId === cert.credentialId ? 'Copied!' : 'Copy ID'}
                    </button>
                  </div>

                  {/* Skills Verified Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {cert.skillsCovered?.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#cbd5e1',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Card Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="btn-card-outline"
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      <AwardIcon size={15} color="#f97316" />
                      <span>View Certificate</span>
                    </button>

                    {cert.verificationUrl && cert.verificationUrl !== '#' && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#ffffff',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(249, 115, 22, 0.15)';
                          e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                        title="Open Verification Portal"
                      >
                        <ExternalLinkIcon size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* + Add New Certificate Placeholder Card in Grid */}
              <div
                onClick={() => setShowAddModal(true)}
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '2px dashed rgba(249, 115, 22, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  minHeight: '360px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(249, 115, 22, 0.06)';
                  e.currentTarget.style.borderColor = '#f97316';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.015)';
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.15)',
                    border: '1px solid rgba(249, 115, 22, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <PlusIcon size={26} color="#f97316" />
                </div>

                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                  + Add Certificate
                </h4>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: '#cbd5e1',
                    maxWidth: '260px',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                  }}
                >
                  Easily attach your certificate image, PDF file, or Credential ID anytime.
                </p>

                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#f97316',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Click to Add Certificate</span>
                  <ArrowRightIcon size={14} />
                </span>
              </div>
            </div>
          )}
        </section>

        {/* =========================================================================
            SECTION 6: CALL TO ACTION BANNER
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
              See These Skills in Action
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
              Explore the real-world case studies, SQL scripts, and interactive Power BI dashboards built using this exact tech stack.
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
                <span>Explore Featured Projects</span>
                <ArrowRightIcon size={16} />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="btn-card-outline"
                style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                <span>About My Background</span>
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
                <span>Get in Touch</span>
                <MailIcon size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          CERTIFICATE LIGHTBOX / PREVIEW MODAL
         ========================================================================= */}
      {selectedCert && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '640px',
              width: '100%',
              background: '#0d141e',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            {/* Modal Image or Fallback Graphic */}
            {selectedCert.image ? (
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                style={{
                  width: '100%',
                  maxHeight: '340px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.3)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '180px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(12, 18, 25, 0.9) 100%)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                <AwardIcon size={44} color="#f97316" />
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f97316' }}>
                  Verified Credential Record
                </span>
              </div>
            )}

            {/* Modal Info */}
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              {selectedCert.title}
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#f97316', fontWeight: 700, marginBottom: '14px' }}>
              {selectedCert.issuer} • {selectedCert.issueDate}
            </p>

            <div
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CREDENTIAL ID:</span>
                <div style={{ fontSize: '0.88rem', fontFamily: 'monospace', fontWeight: 700, color: '#ffffff' }}>
                  {selectedCert.credentialId}
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyCredentialId(selectedCert.credentialId)}
                style={{
                  background: copiedId === selectedCert.credentialId ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: copiedId === selectedCert.credentialId ? '#4ade80' : '#cbd5e1',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {copiedId === selectedCert.credentialId ? 'Copied!' : 'Copy ID'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {selectedCert.image && (
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-card-outline"
                  style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: '0.85rem' }}
                >
                  Open Full File / Image ↗
                </a>
              )}

              {selectedCert.verificationUrl && selectedCert.verificationUrl !== '#' && (
                <a
                  href={selectedCert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: '0.85rem' }}
                >
                  Official Verification Portal ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD CERTIFICATE MODAL: FORM & INSTRUCTIONS
         ========================================================================= */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            overflowY: 'auto',
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '620px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#0d141e',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AwardIcon size={24} color="#f97316" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                  Add Certificate or Credential
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
                  Showcase real credentials on your portfolio anytime
                </p>
              </div>
            </div>

            {/* Mode Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '4px',
                borderRadius: '10px',
                marginBottom: '20px',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveAddTab('form')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeAddTab === 'form' ? '#f97316' : 'transparent',
                  color: activeAddTab === 'form' ? '#000000' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Quick Add via Form
              </button>
              <button
                type="button"
                onClick={() => setActiveAddTab('code')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeAddTab === 'code' ? '#f97316' : 'transparent',
                  color: activeAddTab === 'code' ? '#000000' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Code Instructions (src/SkillsPage.jsx)
              </button>
            </div>

            {activeAddTab === 'form' ? (
              <form onSubmit={handleAddCertificate}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  {/* Certificate Title */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Certificate Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Microsoft Certified: Power BI Data Analyst Associate"
                      value={newCertForm.title}
                      onChange={(e) => setNewCertForm({ ...newCertForm, title: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Issuer & Issue Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                        Issuing Body / School
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Microsoft / Google / HackerRank"
                        value={newCertForm.issuer}
                        onChange={(e) => setNewCertForm({ ...newCertForm, issuer: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                        Issue Date / Year
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Issued 2024"
                        value={newCertForm.issueDate}
                        onChange={(e) => setNewCertForm({ ...newCertForm, issueDate: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Credential ID & Verification URL */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                        Credential ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., MS-PL300-849201"
                        value={newCertForm.credentialId}
                        onChange={(e) => setNewCertForm({ ...newCertForm, credentialId: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          fontFamily: 'monospace',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                        Verification Portal URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://learn.microsoft.com/..."
                        value={newCertForm.verificationUrl}
                        onChange={(e) => setNewCertForm({ ...newCertForm, verificationUrl: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Skills Covered */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Skills Covered (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Power BI, DAX Measures, SQL, Data Modeling"
                      value={newCertForm.skillsCovered}
                      onChange={(e) => setNewCertForm({ ...newCertForm, skillsCovered: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Certificate File / Image */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Certificate File / Image (Choose one)
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleCertificateUpload}
                        style={{
                          fontSize: '0.82rem',
                          color: '#94a3b8',
                        }}
                      />
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Or enter filename in public directory (e.g. <code>/my-cert.png</code>):
                      </div>
                      <input
                        type="text"
                        placeholder="/my-certificate.png"
                        value={newCertForm.image}
                        onChange={(e) => setNewCertForm({ ...newCertForm, image: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.82rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <PlusIcon size={18} color="#000000" />
                  <span>Add Certificate to Portfolio</span>
                </button>
              </form>
            ) : (
              <div>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '18px' }}>
                  To add a certificate permanently into your project's git repository:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {[
                    {
                      step: '1',
                      title: 'Save your certificate file',
                      desc: 'Place your certificate image (PNG, JPG, SVG) or PDF into the /public folder (e.g. /public/my-cert.png).',
                    },
                    {
                      step: '2',
                      title: 'Edit src/SkillsPage.jsx',
                      desc: 'Add your certificate object directly to the certificates state array at line 46:',
                    },
                  ].map((s) => (
                    <div key={s.step} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#f97316',
                          color: '#000000',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {s.step}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{s.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Code Snippet */}
                <div
                  style={{
                    background: '#070b10',
                    borderRadius: '10px',
                    padding: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontFamily: 'monospace',
                    fontSize: '0.78rem',
                    color: '#cbd5e1',
                    lineHeight: 1.5,
                    marginBottom: '20px',
                  }}
                >
                  <div>&#123;</div>
                  <div style={{ paddingLeft: '14px' }}>id: <span style={{ color: '#a7f3d0' }}>'cert-1'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>title: <span style={{ color: '#a7f3d0' }}>'Your Certificate Name'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>issuer: <span style={{ color: '#a7f3d0' }}>'Microsoft / Google'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>credentialId: <span style={{ color: '#a7f3d0' }}>'YOUR-ID-12345'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>issueDate: <span style={{ color: '#a7f3d0' }}>'Issued 2024'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>image: <span style={{ color: '#f97316' }}>'/my-cert.png'</span>, <span style={{ color: '#64748b' }}>// or .pdf</span></div>
                  <div style={{ paddingLeft: '14px' }}>verificationUrl: <span style={{ color: '#a7f3d0' }}>'https://verify.url'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>skillsCovered: [<span style={{ color: '#a7f3d0' }}>'SQL'</span>, <span style={{ color: '#a7f3d0' }}>'Power BI'</span>]</div>
                  <div>&#125;</div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-card-outline"
                  style={{ width: '100%', padding: '10px', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  Close Guide
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
