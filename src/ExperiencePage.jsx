import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import {
  fetchExperiencesService,
  saveExperienceService,
  deleteExperienceService,
  isAdminAuthenticated,
} from './supabase';
import AdminAuthModal from './AdminAuthModal';
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
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  MapPinIcon,
  FileTextIcon,
} from './Icons';

export default function ExperiencePage({ onNavigate }) {
  const [theme, setTheme] = useState('dark');
  const [activeProjectTab, setActiveProjectTab] = useState(0);
  const [selectedExpDoc, setSelectedExpDoc] = useState(null);
  const [copiedRefId, setCopiedRefId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeAddTab, setActiveAddTab] = useState('form'); // 'form' | 'code'
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [pendingAdminAction, setPendingAdminAction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input form state for new experience entry
  const [newExpForm, setNewExpForm] = useState({
    role: '',
    company: '',
    type: 'Internship',
    duration: '',
    location: '',
    responsibilities: '',
    skillsUsed: '',
    document: '',
    referenceId: '',
    verificationUrl: '',
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

  const copyReferenceId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedRefId(id);
    setTimeout(() => {
      setCopiedRefId(null);
    }, 2000);
  };

  // =========================================================================
  // CORPORATE / WORK EXPERIENCE DATA (SYNCED WITH SUPABASE CLOUD & LOCAL CACHE)
  // =========================================================================
  const [workExperiences, setWorkExperiences] = useState(() => {
    try {
      const saved = localStorage.getItem('anant_portfolio_experience');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Fetch experiences from Supabase on component mount
  useEffect(() => {
    fetchExperiencesService().then((data) => {
      if (data && Array.isArray(data)) {
        setWorkExperiences(data);
      }
    });
  }, []);

  // Admin gate for opening Add Experience modal
  const handleOpenAddModal = () => {
    if (!isAdminAuthenticated()) {
      setPendingAdminAction(() => () => setShowAddModal(true));
      setShowAdminModal(true);
      return;
    }
    setShowAddModal(true);
  };

  // Handle adding new work experience (Cloud + Local)
  const handleAddExperience = async (e) => {
    e?.preventDefault();
    if (!newExpForm.role.trim() || !newExpForm.company.trim()) return;

    const skillsArray = newExpForm.skillsUsed
      ? newExpForm.skillsUsed
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : ['SQL', 'Python', 'Power BI'];

    const respArray = newExpForm.responsibilities
      ? newExpForm.responsibilities
          .split('\n')
          .map((r) => r.trim())
          .filter(Boolean)
      : ['Performed end-to-end data analytics and stakeholder reporting.'];

    const newEntry = {
      id: `exp-${Date.now()}`,
      role: newExpForm.role.trim(),
      company: newExpForm.company.trim(),
      type: newExpForm.type || 'Internship',
      duration: newExpForm.duration.trim() || 'Recent',
      location: newExpForm.location.trim() || 'Remote / Hybrid',
      responsibilities: respArray,
      skillsUsed: skillsArray,
      document: newExpForm.document.trim() || '',
      referenceId: newExpForm.referenceId.trim() || `EXP-${Date.now().toString().slice(-6)}`,
      verificationUrl: newExpForm.verificationUrl.trim() || '',
      status: 'Verified',
    };

    try {
      setIsSubmitting(true);
      await saveExperienceService(newEntry);
      setWorkExperiences((prev) => [newEntry, ...prev.filter((exp) => exp.id !== newEntry.id)]);
      setNewExpForm({
        role: '',
        company: '',
        type: 'Internship',
        duration: '',
        location: '',
        responsibilities: '',
        skillsUsed: '',
        document: '',
        referenceId: '',
        verificationUrl: '',
      });
      setShowAddModal(false);
    } catch (err) {
      console.error('Error saving experience:', err);
      // Fallback
      setWorkExperiences((prev) => [newEntry, ...prev.filter((exp) => exp.id !== newEntry.id)]);
      setShowAddModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle removing an added experience (Cloud + Local with Admin check)
  const handleRemoveExperience = (id, e) => {
    e?.stopPropagation();
    if (!isAdminAuthenticated()) {
      setPendingAdminAction(() => () => executeDeleteExperience(id));
      setShowAdminModal(true);
      return;
    }
    if (window.confirm('Are you sure you want to delete this experience entry from the live portfolio?')) {
      executeDeleteExperience(id);
    }
  };

  const executeDeleteExperience = async (id) => {
    try {
      await deleteExperienceService(id);
      setWorkExperiences((prev) => prev.filter((exp) => exp.id !== id));
      if (selectedExpDoc?.id === id) {
        setSelectedExpDoc(null);
      }
    } catch (err) {
      console.error('Error deleting experience:', err);
      alert('Error removing experience from database.');
    }
  };

  // Handle document / offer letter file upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewExpForm((prev) => ({
          ...prev,
          document: event.target?.result || '',
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // =========================================================================
  // DETAILED HANDS-ON PROJECT EXPERIENCE (BUILT FROM SCRATCH)
  // Exact user-specified projects with consulting rigor & business value
  // =========================================================================
  const consultingProjects = [
    {
      id: 'proj-1',
      title: 'Financial Risk Analysis',
      iconEmoji: '📉',
      role: 'Data Analyst Developer',
      techStack: 'SQL • Python • Power BI',
      overview:
        'Banks and lenders lose massive amounts of money when borrowers default. I wanted to understand why. So, I grabbed customer and loan data to map out financial risk.',
      mission: 'Figure out who is likely to default on their loans and why.',
      whatIDid:
        'Wrote SQL queries to sort through credit scores and outstanding balances. Then, I used Python to group customers into low, medium, and high-risk buckets.',
      visuals:
        'Built an interactive Power BI dashboard. It tracks default rates, recovery metrics, and active loans at a single glance.',
      value:
        'Lenders can spot high-risk borrowers early. This helps them make safer, smarter lending decisions.',
      metrics: [
        { label: 'Risk Categorization', value: '3 Tiers (Low/Med/High)', change: 'Quantified' },
        { label: 'Default Drivers Identified', value: '4 Major Factors', change: 'Debt-to-Income & Score' },
        { label: 'Decision Speed', value: 'Instant Drilldown', change: 'Power BI Slicers' },
      ],
      skillsPills: ['SQL Joins & CTEs', 'Python Pandas', 'Credit Scoring', 'Power BI DAX', 'Risk Modeling'],
      themeColor: '#ef4444',
      gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(12, 18, 25, 0.95) 100%)',
    },
    {
      id: 'proj-2',
      title: 'Healthcare Data Analytics',
      iconEmoji: '🏥',
      role: 'Data Analyst Developer',
      techStack: 'SQL • Python • Power BI',
      overview:
        "Hospitals are incredibly busy places. If they don't run smoothly, patients suffer. I analyzed patient and hospital data to optimize daily operations.",
      mission: 'Identify bottlenecks in hospital departments and track treatment costs.',
      whatIDid:
        'Analyzed massive amounts of admission data. I tracked critical KPIs like bed occupancy rates, average length of stay, and how often patients were readmitted.',
      theDeepDive:
        'Compared different departments side-by-side. I wanted to see exactly where delays were happening and why costs were spiking.',
      visuals:
        'Designed a clean Power BI dashboard for hospital managers. It turns complicated medical logistics into clear, actionable trends.',
      value:
        'Operational leads can reallocate medical staff and beds proactively, preventing emergency delays and cost overflows.',
      metrics: [
        { label: 'Occupancy Tracking', value: 'Real-time Ward Level', change: 'ICU & General' },
        { label: 'Avg Length of Stay', value: 'Department Comparison', change: 'Outliers Flagged' },
        { label: 'Readmission Risk', value: '30-Day Tracking', change: 'Predictive Insights' },
      ],
      skillsPills: ['SQL Aggregations', 'Python EDA', 'Hospital KPIs', 'Power BI Dashboards', 'Department Benchmarking'],
      themeColor: '#0ea5e9',
      gradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(12, 18, 25, 0.95) 100%)',
    },
    {
      id: 'proj-3',
      title: 'Supply Chain Optimization Analytics',
      iconEmoji: '🚚',
      role: 'Data Analyst Developer',
      techStack: 'SQL • Python • Power BI',
      overview:
        'A single late delivery can ruin a business relationship. For this project, I dove into order, supplier, and delivery data to fix supply chain bottlenecks.',
      mission: 'Uncover why deliveries get delayed and where transportation costs are leaking.',
      whatIDid:
        'Evaluated supplier performance. I calculated lead times, on-time delivery percentages, and overall order fulfillment rates.',
      theDiscovery:
        'Found the exact high-cost areas and operational bottlenecks that cause shipping delays.',
      visuals:
        'Created a robust supply chain dashboard in Power BI. It allows operations teams to monitor suppliers and track deliveries in real time.',
      value:
        'Operations teams can hold underperforming vendors accountable, reroute high-friction transit lanes, and cut unnecessary freight expenses.',
      metrics: [
        { label: 'On-Time Delivery Rate', value: 'Supplier Scorecards', change: 'Vendor Ranked' },
        { label: 'Lead Time Variance', value: 'Lane-by-Lane', change: 'Bottlenecks Isolated' },
        { label: 'Cost Leakage', value: 'Transit Auditing', change: 'High-Cost Routes Flagged' },
      ],
      skillsPills: ['Vendor Scorecards', 'SQL Window Functions', 'Python Logistics', 'Power BI Live KPIs', 'Lead Time Auditing'],
      themeColor: '#10b981',
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(12, 18, 25, 0.95) 100%)',
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 15% 15%, rgba(249, 115, 22, 0.08) 0%, transparent 45%), radial-gradient(circle at 85% 65%, rgba(14, 165, 233, 0.05) 0%, transparent 45%), #0c1219',
        color: '#ffffff',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Unified Responsive Navigation Bar */}
      <Navbar
        activeNav="experience"
        currentPage="experience"
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={onNavigate}
      />

      {/* Main Container */}
      <main style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(90px, 12vw, 120px) clamp(16px, 3vw, 24px) 80px clamp(16px, 3vw, 24px)' }}>
        {/* =========================================================================
            SECTION 1: HERO / CORE EXPERIENCE PHILOSOPHY
           ========================================================================= */}
        <section style={{ textAlign: 'center', marginBottom: '60px' }}>
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
              marginBottom: '20px',
            }}
          >
            <span>✦ PRACTICAL EXPERIENCE • PROBLEM-SOLVER MINDSET</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '20px',
              color: '#ffffff',
            }}
          >
            Real Business Solutions.{' '}
            <span style={{ color: '#f97316' }}>Hands-On Experience.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#cbd5e1',
              maxWidth: '820px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6,
            }}
          >
            {workExperiences.length === 0
              ? 'I believe tangible results speak louder than job titles. Here is how I tackle messy, real-world data problems with a consulting mindset to deliver measurable cost, risk, and efficiency gains.'
              : 'Proven data analytics expertise across corporate roles, verified industry internships, and full-lifecycle business case studies.'}
          </p>

          {/* Quick Jump Badge when corporate experiences are present */}
          {workExperiences.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <a
                href="#corporate-experience"
                style={{
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  color: '#4ade80',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                }}
              >
                <CheckCircleIcon size={15} color="#4ade80" />
                <span>
                  {workExperiences.length} Verified Experience{workExperiences.length > 1 ? 's' : ''} Added • Jump to Corporate Roles ↓
                </span>
              </a>
            </div>
          )}

          {/* Core Philosophy Banner (Exact User Text) - Automatically disappears once work experience is added */}
          {workExperiences.length === 0 && (
            <div
              style={{
                maxWidth: '920px',
                margin: '0 auto',
                padding: '32px 36px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(249, 115, 22, 0.35)',
                position: 'relative',
                textAlign: 'left',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  color: '#f97316',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}
              >
                <BriefcaseIcon size={14} color="#f97316" />
                <span>FRESHER DATA ANALYST MANIFESTO</span>
              </div>

              <p
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                “I don’t have a long corporate history yet. But I do have hands-on experience solving real business problems. I treat every project like a consulting gig. I find raw data, clean up the noise, and look for insights that save time or money. Here is what I have built from scratch:”
              </p>

              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#f97316',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000000',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                    }}
                  >
                    AS
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>Anant Singh</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Aspiring Data Analyst • SQL, Python &amp; Power BI</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      fontSize: '0.78rem',
                      color: '#cbd5e1',
                    }}
                  >
                    💡 Consulting Mindset
                  </span>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      fontSize: '0.78rem',
                      color: '#cbd5e1',
                    }}
                  >
                    ⏱️ Time &amp; Cost Savings
                  </span>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      fontSize: '0.78rem',
                      color: '#cbd5e1',
                    }}
                  >
                    📊 Interactive Power BI
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* =========================================================================
            SECTION 2: DETAILED HANDS-ON PROJECTS (THE 3 BUILT FROM SCRATCH)
           ========================================================================= */}
        <section style={{ marginBottom: '80px' }} id="projects-breakdown">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 16px',
                borderRadius: '9999px',
                background: 'rgba(249, 115, 22, 0.1)',
                color: '#f97316',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '10px',
              }}
            >
              <span>CASE STUDIES BUILT FROM SCRATCH</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              Full-Lifecycle Analytics Case Studies
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '680px', margin: '0 auto' }}>
              Explore the business problems, SQL queries, Python modeling, and Power BI dashboards engineered for each domain.
            </p>
          </div>

          {/* Quick Select Project Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '32px',
            }}
          >
            {consultingProjects.map((p, index) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProjectTab(index)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  background: activeProjectTab === index ? 'rgba(249, 115, 22, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border:
                    activeProjectTab === index
                      ? '1px solid rgba(249, 115, 22, 0.6)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                  color: activeProjectTab === index ? '#f97316' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{p.iconEmoji}</span>
                <span>{p.title}</span>
              </button>
            ))}
          </div>

          {/* Active Featured Project Deep Dive Card */}
          {(() => {
            const activeProj = consultingProjects[activeProjectTab];
            return (
              <div
                style={{
                  padding: '36px',
                  borderRadius: '24px',
                  background: activeProj.gradient,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
                  marginBottom: '40px',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: '24px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.8rem',
                      }}
                    >
                      {activeProj.iconEmoji}
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          color: '#f97316',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Project {activeProjectTab + 1} • {activeProj.role}
                      </span>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', margin: '4px 0 0 0' }}>
                        {activeProj.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#a7f3d0',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Stack:</span>
                    <span style={{ color: '#ffffff' }}>{activeProj.techStack}</span>
                  </div>
                </div>

                {/* Context & Problem Setup */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '1.08rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                    {activeProj.overview}
                  </p>
                </div>

                {/* 4 Core Pillars Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px',
                  }}
                >
                  {/* Pillar 1: The Mission */}
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.1rem' }}>🎯</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f97316', margin: 0 }}>
                        The Mission
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                      {activeProj.mission}
                    </p>
                  </div>

                  {/* Pillar 2: What I Did */}
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.1rem' }}>⚡</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                        What I Did
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                      {activeProj.whatIDid}
                    </p>
                  </div>

                  {/* Pillar 3: Visuals or Deep Dive */}
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.1rem' }}>📊</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#a7f3d0', margin: 0 }}>
                        The Visuals &amp; Deep Dive
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                      {activeProj.theDeepDive || activeProj.theDiscovery || activeProj.visuals}
                    </p>
                  </div>

                  {/* Pillar 4: The Value */}
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.1rem' }}>💰</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fbbf24', margin: 0 }}>
                        The Business Value
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                      {activeProj.value}
                    </p>
                  </div>
                </div>

                {/* Measurable Results & Skills Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {activeProj.skillsPills.map((pill) => (
                      <span
                        key={pill}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className="btn-card-outline"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <span>View Project in Projects Tab</span>
                    <ArrowRightIcon size={14} />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Grid View of all 3 projects for quick overview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {consultingProjects.map((proj, idx) => (
              <div
                key={proj.id}
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border:
                    activeProjectTab === idx
                      ? '1px solid rgba(249, 115, 22, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveProjectTab(idx)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (activeProjectTab !== idx) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '1.8rem' }}>{proj.iconEmoji}</span>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#f97316', fontWeight: 800, textTransform: 'uppercase' }}>
                      Project {idx + 1}
                    </span>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                      {proj.title}
                    </h4>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '16px', flex: 1 }}>
                  {proj.mission}
                </p>

                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.25)',
                    marginBottom: '16px',
                    fontSize: '0.78rem',
                    color: '#94a3b8',
                  }}
                >
                  <strong style={{ color: '#ffffff' }}>Value:</strong> {proj.value}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: '#f97316', fontWeight: 700 }}>
                    {proj.techStack}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {activeProjectTab === idx ? 'Viewing Deep Dive' : 'Click to View'}
                    <ArrowRightIcon size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: CONSULTING METHODOLOGY & APPROACH
           ========================================================================= */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 16px',
                borderRadius: '9999px',
                background: 'rgba(249, 115, 22, 0.1)',
                color: '#f97316',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '10px',
              }}
            >
              <span>THE ANALYST PLAYBOOK</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              How I Treat Every Problem Like a Consulting Gig
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '680px', margin: '0 auto' }}>
              From initial raw data dumps to high-impact dashboards, I maintain rigorous quality standards at every step.
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
                title: 'Data Ingestion & Hygiene',
                desc: 'I pull exact fields using SQL queries (PostgreSQL/MySQL), removing null traps, duplicates, and noisy anomalies before analysis starts.',
                tools: 'SQL • CTEs • Joins',
              },
              {
                step: '02',
                title: 'Hypothesis & EDA',
                desc: 'Using Python (Pandas/NumPy), I group records into statistically valid buckets, identifying the root causes behind variances and financial risk.',
                tools: 'Python • Pandas • EDA',
              },
              {
                step: '03',
                title: 'Executive Dashboards',
                desc: 'I transform numbers into visual stories in Power BI. No cluttered graphs—just clean KPIs, interactive slicers, and trends managers can scan in 5 seconds.',
                tools: 'Power BI • DAX • UX',
              },
              {
                step: '04',
                title: 'Actionable Business Value',
                desc: 'Every dashboard ends with concrete recommendations that save operational time, prevent loan defaults, or curb shipping leakage.',
                tools: 'ROI • Cost Savings',
              },
            ].map((card) => (
              <div
                key={card.step}
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.025)',
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
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: 'rgba(249, 115, 22, 0.35)',
                    marginBottom: '12px',
                    fontFamily: 'monospace',
                  }}
                >
                  {card.step}
                </div>

                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                  {card.title}
                </h4>

                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                  {card.desc}
                </p>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#f97316',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {card.tools}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: PROFESSIONAL & CORPORATE WORK EXPERIENCE
            (FUTURE WORK EXPERIENCE VAULT & ADD FUNCTIONALITY - NO DUMMY DATA)
           ========================================================================= */}
        <section style={{ marginBottom: '80px' }} id="corporate-experience">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 16px',
                borderRadius: '9999px',
                background: 'rgba(249, 115, 22, 0.1)',
                color: '#f97316',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '10px',
              }}
            >
              <span>PROFESSIONAL WORK EXPERIENCE &amp; ROLES</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '10px',
              }}
            >
              Corporate &amp; Internship Experience
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '680px', margin: '0 auto' }}>
              A dedicated vault for corporate internships, full-time analyst roles, and consulting engagements as I take on new industry positions.
            </p>
          </div>

          {/* Conditional Experience Grid */}
          {workExperiences.length === 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                alignItems: 'stretch',
              }}
            >
              {/* Ready State / Work Experience Vault Showcase Card */}
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
                    <BuildingIcon size={14} color="#f97316" />
                    <span>Experience Vault • Ready</span>
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
                    Ready for Corporate Roles &amp; Internships
                  </h3>

                  <p
                    style={{
                      color: '#cbd5e1',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                    }}
                  >
                    This section is pre-configured and waiting to showcase future corporate work experience (Full-Time Data Analyst, Business Intelligence Intern, or Consulting contracts) with verifiable documentation.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {[
                      {
                        icon: '🏢',
                        label: 'Role & Organization Profile',
                        desc: 'Title, company name, employment type, location, and dates.',
                      },
                      {
                        icon: '🎯',
                        label: 'Key Deliverables & KPIs',
                        desc: 'Measurable business achievements and technical stack used.',
                      },
                      {
                        icon: '📄',
                        label: 'Experience Letter & Reference ID',
                        desc: 'Attach official experience letters, certificates, or verifiable portal IDs.',
                      },
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
                  onClick={handleOpenAddModal}
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
                  <span>+ Add Work Experience</span>
                </button>
              </div>

              {/* + Add New Experience Action Card */}
              <div
                onClick={handleOpenAddModal}
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
                  + Add Experience
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
                  Attach your company role, deliverables, tech stack, and experience letter or reference ID.
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
                  <span>Click to Add Experience</span>
                  <ArrowRightIcon size={14} />
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '24px',
              }}
            >
              {workExperiences.map((exp) => (
                <div
                  key={exp.id}
                  style={{
                    padding: '28px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.25s ease',
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
                  {/* Top Row: Type Badge & Action Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '14px',
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        background: 'rgba(249, 115, 22, 0.12)',
                        border: '1px solid rgba(249, 115, 22, 0.35)',
                        color: '#f97316',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {exp.type}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.72rem',
                          color: '#4ade80',
                          fontWeight: 700,
                        }}
                      >
                        <CheckCircleIcon size={12} color="#4ade80" />
                        <span>Verified</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleRemoveExperience(exp.id, e)}
                        title="Remove Experience"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
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

                  {/* Role Title */}
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                    {exp.role}
                  </h4>

                  {/* Company & Meta */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px',
                      fontSize: '0.82rem',
                      color: '#cbd5e1',
                      marginBottom: '16px',
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#f97316' }}>{exp.company}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CalendarIcon size={14} />
                      {exp.duration}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPinIcon size={14} />
                      {exp.location}
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <div style={{ marginBottom: '18px', flex: 1 }}>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        fontSize: '0.86rem',
                        color: '#cbd5e1',
                        lineHeight: 1.55,
                      }}
                    >
                      {exp.responsibilities?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                    {exp.skillsUsed?.map((skill) => (
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

                  {/* Reference ID Box & Actions */}
                  <div
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                        Reference ID
                      </span>
                      <div
                        style={{
                          fontSize: '0.82rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: '#ffffff',
                        }}
                      >
                        {exp.referenceId}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyReferenceId(exp.referenceId)}
                      style={{
                        background:
                          copiedRefId === exp.referenceId ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: copiedRefId === exp.referenceId ? '#4ade80' : '#cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {copiedRefId === exp.referenceId ? 'Copied!' : 'Copy ID'}
                    </button>
                  </div>

                  {/* Bottom Action Button */}
                  {exp.document ? (
                    <button
                      type="button"
                      onClick={() => setSelectedExpDoc(exp)}
                      className="btn-card-outline"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      <FileTextIcon size={15} color="#f97316" />
                      <span>View Experience Document</span>
                    </button>
                  ) : exp.verificationUrl ? (
                    <a
                      href={exp.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-card-outline"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        textAlign: 'center',
                      }}
                    >
                      <ExternalLinkIcon size={14} />
                      <span>Verify on Portal</span>
                    </a>
                  ) : null}
                </div>
              ))}

              {/* + Add New Experience Card in Grid */}
              <div
                onClick={handleOpenAddModal}
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '2px dashed rgba(249, 115, 22, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  minHeight: '340px',
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
                  + Add Experience
                </h4>

                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', maxWidth: '260px', lineHeight: 1.5, marginBottom: '16px' }}>
                  Attach a corporate position, internship, or consulting role anytime.
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
                  <span>Click to Add Experience</span>
                  <ArrowRightIcon size={14} />
                </span>
              </div>
            </div>
          )}
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
            <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              Looking for a Proactive Fresher Data Analyst?
            </h3>

            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
              I bring hands-on SQL precision, Python data wrangling, and executive Power BI dashboards to every team I join.
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                Explore Featured Projects →
              </button>

              <button
                type="button"
                onClick={() => onNavigate('skills')}
                className="btn-card-outline"
                style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                View Technical Stack
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="btn-card-outline"
                style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                Get in Touch ✉
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          MODAL: VIEW EXPERIENCE DOCUMENT / OFFER LETTER
         ========================================================================= */}
      {selectedExpDoc && (
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
          onClick={() => setSelectedExpDoc(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '680px',
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
              onClick={() => setSelectedExpDoc(null)}
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

            {/* Document Preview or Graphic */}
            {selectedExpDoc.document ? (
              <img
                src={selectedExpDoc.document}
                alt={`${selectedExpDoc.role} Document`}
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
                <BriefcaseIcon size={44} color="#f97316" />
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f97316' }}>
                  Verified Professional Experience Record
                </span>
              </div>
            )}

            {/* Info */}
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              {selectedExpDoc.role}
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#f97316', fontWeight: 700, marginBottom: '16px' }}>
              {selectedExpDoc.company} • {selectedExpDoc.duration} • {selectedExpDoc.location}
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
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>REFERENCE / VERIFICATION ID:</span>
                <div style={{ fontSize: '0.88rem', fontFamily: 'monospace', fontWeight: 700, color: '#ffffff' }}>
                  {selectedExpDoc.referenceId}
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyReferenceId(selectedExpDoc.referenceId)}
                style={{
                  background:
                    copiedRefId === selectedExpDoc.referenceId
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: copiedRefId === selectedExpDoc.referenceId ? '#4ade80' : '#cbd5e1',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {copiedRefId === selectedExpDoc.referenceId ? 'Copied!' : 'Copy ID'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {selectedExpDoc.document && (
                <a
                  href={selectedExpDoc.document}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-card-outline"
                  style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: '0.85rem' }}
                >
                  Open Full File / Document ↗
                </a>
              )}

              {selectedExpDoc.verificationUrl && (
                <a
                  href={selectedExpDoc.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: '0.85rem' }}
                >
                  Company Verification Portal ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD EXPERIENCE MODAL: FORM & CODE INSTRUCTIONS
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
                <BriefcaseIcon size={24} color="#f97316" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                  Add Work Experience
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
                  Record a future job, internship, or consulting role on your portfolio
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
                Code Instructions (src/ExperiencePage.jsx)
              </button>
            </div>

            {activeAddTab === 'form' ? (
              <form onSubmit={handleAddExperience}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  {/* Job Title */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Job Title / Role *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Junior Data Analyst or Business Intelligence Intern"
                      value={newExpForm.role}
                      onChange={(e) => setNewExpForm({ ...newExpForm, role: e.target.value })}
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

                  {/* Company & Employment Type */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Acme Analytics Ltd."
                        value={newExpForm.company}
                        onChange={(e) => setNewExpForm({ ...newExpForm, company: e.target.value })}
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
                        Employment Type
                      </label>
                      <select
                        value={newExpForm.type}
                        onChange={(e) => setNewExpForm({ ...newExpForm, type: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: '#0d141e',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      >
                        <option value="Internship">Internship</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                  </div>

                  {/* Duration & Location */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                        Duration / Dates
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Jun 2024 - Dec 2024 or Present"
                        value={newExpForm.duration}
                        onChange={(e) => setNewExpForm({ ...newExpForm, duration: e.target.value })}
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
                        Location / Work Mode
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Bengaluru, India / Remote"
                        value={newExpForm.location}
                        onChange={(e) => setNewExpForm({ ...newExpForm, location: e.target.value })}
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

                  {/* Responsibilities */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Key Responsibilities &amp; Impact (One per line)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Wrote SQL queries to extract cohort KPIs&#10;Built executive Power BI dashboards with DAX measures&#10;Automated daily data quality audits in Python"
                      value={newExpForm.responsibilities}
                      onChange={(e) => setNewExpForm({ ...newExpForm, responsibilities: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  {/* Skills Used */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Technical Stack Used (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., SQL, PostgreSQL, Python, Power BI, Excel, Git"
                      value={newExpForm.skillsUsed}
                      onChange={(e) => setNewExpForm({ ...newExpForm, skillsUsed: e.target.value })}
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

                  {/* Document Attachment & Reference ID */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                        Reference / Verification ID
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., EXP-2024-9988"
                        value={newExpForm.referenceId}
                        onChange={(e) => setNewExpForm({ ...newExpForm, referenceId: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          fontFamily: 'monospace',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                        Verification Portal URL (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://company.com/verify"
                        value={newExpForm.verificationUrl}
                        onChange={(e) => setNewExpForm({ ...newExpForm, verificationUrl: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Experience Document / Offer Letter (Image / PDF)
                    </label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleDocumentUpload}
                      style={{ fontSize: '0.82rem', color: '#94a3b8' }}
                    />
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
                  <span>Add Experience to Portfolio</span>
                </button>
              </form>
            ) : (
              <div>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '18px' }}>
                  To add a job or internship permanently into your project's git repository:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {[
                    {
                      step: '1',
                      title: 'Save your experience document',
                      desc: 'Place your experience letter image or PDF into the /public directory (e.g. /public/exp-acme.png).',
                    },
                    {
                      step: '2',
                      title: 'Edit src/ExperiencePage.jsx',
                      desc: 'Add your experience object to the workExperiences array at line 55:',
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
                  <div style={{ paddingLeft: '14px' }}>id: <span style={{ color: '#a7f3d0' }}>'exp-1'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>role: <span style={{ color: '#a7f3d0' }}>'Data Analyst Intern'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>company: <span style={{ color: '#a7f3d0' }}>'Acme Corporation'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>type: <span style={{ color: '#a7f3d0' }}>'Internship'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>duration: <span style={{ color: '#a7f3d0' }}>'Jun 2024 - Dec 2024'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>location: <span style={{ color: '#a7f3d0' }}>'Bengaluru, India'</span>,</div>
                  <div style={{ paddingLeft: '14px' }}>responsibilities: [<span style={{ color: '#a7f3d0' }}>'Optimized SQL queries'</span>, <span style={{ color: '#a7f3d0' }}>'Built Power BI dashboards'</span>],</div>
                  <div style={{ paddingLeft: '14px' }}>skillsUsed: [<span style={{ color: '#a7f3d0' }}>'SQL'</span>, <span style={{ color: '#a7f3d0' }}>'Power BI'</span>, <span style={{ color: '#a7f3d0' }}>'Python'</span>],</div>
                  <div style={{ paddingLeft: '14px' }}>document: <span style={{ color: '#f97316' }}>'/exp-acme.png'</span>, <span style={{ color: '#64748b' }}>// or .pdf</span></div>
                  <div style={{ paddingLeft: '14px' }}>referenceId: <span style={{ color: '#a7f3d0' }}>'ACM-2024-889'</span></div>
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

      {/* =========================================================================
          FOOTER
         ========================================================================= */}
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

      {/* Admin Authentication Modal */}
      <AdminAuthModal
        isOpen={showAdminModal}
        onClose={() => {
          setShowAdminModal(false);
          setPendingAdminAction(null);
        }}
        onSuccess={() => {
          if (pendingAdminAction) {
            const action = pendingAdminAction;
            setPendingAdminAction(null);
            action();
          }
        }}
        title="Admin Verification"
      />
    </div>
  );
}
