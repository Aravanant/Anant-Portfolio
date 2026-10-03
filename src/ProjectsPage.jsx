import React, { useState, useEffect } from 'react';
import {
  fetchProjectsService,
  saveProjectService,
  deleteProjectService,
  isAdminAuthenticated,
} from './supabase';
import AdminAuthModal from './AdminAuthModal';
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
  PlusIcon,
  TrashIcon,
  ExternalLinkIcon,
  CodeIcon,
  SqlIcon,
  AwardIcon,
  CheckCircleIcon,
  BriefcaseIcon,
  MailIcon,
} from './Icons';

export default function ProjectsPage({ onNavigateHome, onNavigate = onNavigateHome }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [theme, setTheme] = useState('dark');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeAddTab, setActiveAddTab] = useState('form');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [pendingAdminAction, setPendingAdminAction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial projects state initialized from localStorage, defaulting to empty array (NO dummy projects)
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('anant_portfolio_projects');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      const dummyIds = ['churn', 'sales-bi', 'supply-chain', 'hr-attrition'];
      return Array.isArray(parsed) ? parsed.filter((p) => !dummyIds.includes(p.id)) : [];
    } catch (e) {
      return [];
    }
  });

  // Fetch projects from Supabase on component mount
  useEffect(() => {
    fetchProjectsService().then((data) => {
      if (data && Array.isArray(data)) {
        setProjects(data);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Form State for Adding New Project
  const defaultProjForm = {
    title: '',
    category: 'Python & SQL',
    domain: '',
    summary: '',
    stack: '',
    metric1Val: '',
    metric1Label: '',
    metric2Val: '',
    metric2Label: '',
    metric3Val: '',
    metric3Label: '',
    githubLink: '',
    demoLink: '',
    thumbnail: '',
  };

  const [newProjForm, setNewProjForm] = useState(defaultProjForm);

  // Admin gate for opening Add Project modal
  const handleOpenAddModal = () => {
    if (!isAdminAuthenticated()) {
      setPendingAdminAction(() => () => setShowAddModal(true));
      setShowAdminModal(true);
      return;
    }
    setShowAddModal(true);
  };

  // File Upload Handler (Converts uploaded image/file to Data URL)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB. Please choose an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setNewProjForm((prev) => ({
        ...prev,
        thumbnail: uploadEvent.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Add Project Submission Handler (Cloud + Local)
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProjForm.title.trim()) {
      alert('Please provide a Project Title.');
      return;
    }

    // Parse stack comma-separated values
    const stackArray = newProjForm.stack
      ? newProjForm.stack
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : ['SQL', 'Python', 'Power BI'];

    // Parse metrics
    const metrics = [];
    if (newProjForm.metric1Val.trim() || newProjForm.metric1Label.trim()) {
      metrics.push({
        val: newProjForm.metric1Val.trim() || 'KPI',
        label: newProjForm.metric1Label.trim() || 'Key Metric',
      });
    }
    if (newProjForm.metric2Val.trim() || newProjForm.metric2Label.trim()) {
      metrics.push({
        val: newProjForm.metric2Val.trim() || 'KPI',
        label: newProjForm.metric2Label.trim() || 'Key Metric',
      });
    }
    if (newProjForm.metric3Val.trim() || newProjForm.metric3Label.trim()) {
      metrics.push({
        val: newProjForm.metric3Val.trim() || 'KPI',
        label: newProjForm.metric3Label.trim() || 'Key Metric',
      });
    }

    const newProject = {
      id: `proj-${Date.now()}`,
      title: newProjForm.title.trim(),
      category: newProjForm.category.trim() || 'Python & SQL',
      domain: newProjForm.domain.trim() || 'Data Analytics & Business Intelligence',
      summary:
        newProjForm.summary.trim() ||
        'Comprehensive data analytics project executing exploratory data analysis (EDA), automated SQL query pipelines, and business intelligence reporting.',
      stack: stackArray,
      metrics:
        metrics.length > 0
          ? metrics
          : [
              { label: 'Pipeline Status', val: '100% Validated' },
              { label: 'SQL & Code', val: 'GitHub Repo' },
              { label: 'Business Impact', val: 'Quantified' },
            ],
      thumbnail: newProjForm.thumbnail || '',
      githubLink: newProjForm.githubLink.trim() || 'https://github.com',
      demoLink: newProjForm.demoLink.trim() || '',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    try {
      setIsSubmitting(true);
      await saveProjectService(newProject);
      setProjects((prev) => [newProject, ...prev.filter((p) => p.id !== newProject.id)]);
      setNewProjForm(defaultProjForm);
      setShowAddModal(false);
    } catch (err) {
      console.error('Error saving project to cloud:', err);
      // Local fallback
      setProjects((prev) => [newProject, ...prev.filter((p) => p.id !== newProject.id)]);
      setNewProjForm(defaultProjForm);
      setShowAddModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Remove Project Handler (Admin Gated + Cloud)
  const handleRemoveProject = (id, e) => {
    e.stopPropagation();
    if (!isAdminAuthenticated()) {
      setPendingAdminAction(() => () => executeDeleteProject(id));
      setShowAdminModal(true);
      return;
    }
    if (window.confirm('Are you sure you want to delete this project from your portfolio?')) {
      executeDeleteProject(id);
    }
  };

  const executeDeleteProject = async (id) => {
    try {
      await deleteProjectService(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
    } catch (err) {
      console.error('Error deleting project from database:', err);
      alert('Error deleting project.');
    }
  };

  // Filter projects by category or stack tags
  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(
          (item) =>
            item.category?.toLowerCase().includes(activeFilter.toLowerCase()) ||
            item.stack?.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  // Copy Code Snippet
  const sampleCodeSnippet = `// Add directly to initial projects in src/ProjectsPage.jsx:
{
  id: "proj-${Date.now()}",
  category: "Python & SQL", // "Python & SQL" | "Power BI & Tableau" | "Statistical Analysis"
  title: "Your Project Title Here",
  domain: "FinTech & Banking Analytics",
  summary: "Comprehensive description of the business problem, data cleaning steps, SQL CTEs/window functions, statistical modeling, and quantified ROI outcome...",
  stack: ["SQL (PostgreSQL)", "Python", "Pandas", "Power BI", "Scikit-Learn"],
  metrics: [
    { label: "Model ROC-AUC", val: "84.2%" },
    { label: "Records Analyzed", val: "50,000+" },
    { label: "Cost Savings", val: "$120,000+" }
  ],
  thumbnail: "/project-thumbnail.png", // Or leave empty for default high-tech badge
  githubLink: "https://github.com/your-username/your-repository", // Opens via 'Code & SQL' button
  demoLink: "https://public.tableau.com/..." // Optional live dashboard URL
}`;

  const copyCodeSnippet = () => {
    navigator.clipboard.writeText(sampleCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // 5-Step Reproducible Analytics Methodology
  const methodologySteps = [
    {
      num: '01',
      title: 'Business Understanding & Data Ingestion',
      desc: 'Formulate quantifiable questions from stakeholder objectives. Query normalized relational databases via SQL, extract from APIs, or scrape web telemetry.',
    },
    {
      num: '02',
      title: 'Data Cleaning & Wrangling',
      desc: 'Audit schema integrity, handle missing values, resolve type mismatches, filter anomalies, and structure clean analysis tables using Pandas & SQL.',
    },
    {
      num: '03',
      title: 'Exploratory Data Analysis (EDA) & Stats',
      desc: 'Conduct statistical profiling, distribution assessments, correlation checks, and hypothesis testing (t-tests, ANOVA, Chi-Square) to discover meaningful patterns.',
    },
    {
      num: '04',
      title: 'Interactive BI Modeling & Dashboards',
      desc: 'Build scalable star-schema models, write DAX / calculated metrics, and author user-centric dashboards in Power BI and Tableau with intuitive drill-downs.',
    },
    {
      num: '05',
      title: 'Actionable Storytelling & Decision Delivery',
      desc: 'Translate complex statistical findings into clear executive summaries, risk-assessed takeaways, and strategic recommendations for leadership.',
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
                  item.id === 'projects'
                    ? '/projects'
                    : item.id === 'about'
                    ? '/about'
                    : item.id === 'skills'
                    ? '/skills'
                    : item.id === 'experience'
                    ? '/experience'
                    : item.id === 'contact'
                    ? '/contact'
                    : `/#${item.id}`
                }
                onClick={(e) => {
                  if (item.id !== 'projects') {
                    e.preventDefault();
                    (onNavigate || onNavigateHome)(item.id);
                  }
                }}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: item.id === 'projects' ? 700 : 500,
                  color: item.id === 'projects' ? 'var(--accent-orange)' : 'var(--nav-text-muted)',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.label}
                {item.id === 'projects' && (
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
            SECTION 1: TITLE & SUBTEXT REGARDING THIS PAGE + ANALYTICS HIGHLIGHTS
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
            <span>✦ DATA ANALYST PORTFOLIO • PROJECTS &amp; CASE STUDIES</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '18px',
              color: '#ffffff',
            }}
          >
            Transforming Complex Data into{' '}
            <span style={{ color: '#f97316' }}>Strategic Business Value</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: '1.15rem',
              color: '#cbd5e1',
              maxWidth: '820px',
              margin: '0 auto 36px auto',
              lineHeight: 1.7,
            }}
          >
            A curated showcase of end-to-end analytical work as an aspiring Data Analyst.
            Explore real-world case studies featuring exploratory data analysis (EDA), automated SQL pipelines,
            predictive statistical modeling, and executive BI dashboards built with Python, SQL, Tableau, Power BI, and Advanced Excel.
          </p>

          {/* KPI Metrics Highlight Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              maxWidth: '960px',
              margin: '0 auto 40px auto',
            }}
          >
            {[
              { num: `${projects.length}`, label: 'Featured Projects' },
              { num: 'SQL & Python', label: 'Primary Tech Stack' },
              { num: '100% Verified', label: 'GitHub Source & SQL' },
              { num: 'Production-Ready', label: 'Pipeline Reliability' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '18px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f97316', marginBottom: '4px' }}>
                  {stat.num}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Action Row: Filter Pills + Add Project Trigger Button */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {['All', 'Python & SQL', 'Power BI & Tableau', 'Statistical Analysis'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                style={{
                  border: activeFilter === tab ? '1px solid #f97316' : '1px solid rgba(255, 255, 255, 0.15)',
                  background: activeFilter === tab ? 'rgba(249, 115, 22, 0.18)' : 'transparent',
                  color: activeFilter === tab ? '#f97316' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '9px 20px',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeFilter === tab ? '0 0 14px rgba(249, 115, 22, 0.35)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}

            {/* Quick Add Project Trigger Button */}
            <button
              type="button"
              onClick={handleOpenAddModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 22px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                border: '1px solid rgba(249, 115, 22, 0.6)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(249, 115, 22, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(249, 115, 22, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(249, 115, 22, 0.35)';
              }}
            >
              <PlusIcon size={16} color="#ffffff" />
              <span>+ Add Project</span>
            </button>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: FEATURED DATA ANALYTICS PROJECTS & CASE STUDIES
           ========================================================================= */}
        <section style={{ marginBottom: '90px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                }}
              >
                Featured Data Analytics Projects
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '680px' }}>
                Rigorous, business-oriented analytical deliverables demonstrating hypothesis generation,
                data wrangling, automated SQL pipelines, and actionable strategic takeaways.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              <PlusIcon size={18} color="#000000" />
              <span>Add Project</span>
            </button>
          </div>

          {/* Project Showcase Grid or Empty Vault State */}
          {projects.length === 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px',
                alignItems: 'stretch',
              }}
            >
              {/* Ready State / Projects Vault Showcase Card */}
              <div
                style={{
                  padding: '36px 32px',
                  borderRadius: '24px',
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
                      padding: '4px 14px',
                      borderRadius: '9999px',
                      background: 'rgba(249, 115, 22, 0.12)',
                      border: '1px solid rgba(249, 115, 22, 0.3)',
                      color: '#f97316',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '18px',
                    }}
                  >
                    <CodeIcon size={14} color="#f97316" />
                    <span>Projects Vault • Ready</span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '12px',
                      lineHeight: 1.3,
                    }}
                  >
                    Ready for Your Real Analytics Projects
                  </h3>

                  <p
                    style={{
                      color: '#cbd5e1',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      marginBottom: '24px',
                    }}
                  >
                    This section is pre-configured and waiting to showcase your verified data analytics projects, SQL query pipelines, Python scripts, statistical analyses, and interactive dashboards.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                    {[
                      {
                        icon: '🗄️',
                        label: 'Code & SQL GitHub Buttons',
                        desc: 'Dedicated 1-click button connecting recruiters directly to your GitHub repository and SQL scripts.',
                      },
                      {
                        icon: '📈',
                        label: 'Measurable Business Metrics',
                        desc: 'Showcase quantifiable KPI impact, records processed, and business dollars or hours saved.',
                      },
                      {
                        icon: '📊',
                        label: 'Interactive BI & Media',
                        desc: 'Attach screenshots, project diagrams, and direct live links to Tableau Public or Power BI reports.',
                      },
                    ].map((feature) => (
                      <div
                        key={feature.label}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>{feature.icon}</span>
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                            {feature.label}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '3px' }}>
                            {feature.desc}
                          </div>
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
                    padding: '14px 24px',
                    fontSize: '0.92rem',
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
                  <span>+ Add Your First Project</span>
                </button>
              </div>

              {/* + Add New Project Dashed Action Card */}
              <div
                onClick={handleOpenAddModal}
                style={{
                  padding: '36px 32px',
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '2px dashed rgba(249, 115, 22, 0.45)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  minHeight: '420px',
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
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.15)',
                    border: '1px solid rgba(249, 115, 22, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    boxShadow: '0 0 24px rgba(249, 115, 22, 0.2)',
                  }}
                >
                  <PlusIcon size={32} color="#f97316" />
                </div>

                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                  + Add Project
                </h4>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#cbd5e1',
                    maxWidth: '320px',
                    lineHeight: 1.55,
                    marginBottom: '24px',
                  }}
                >
                  Attach your project title, GitHub repository URL, SQL scripts, impact metrics, and visuals.
                </p>

                <div
                  style={{
                    padding: '9px 20px',
                    borderRadius: '10px',
                    background: 'rgba(249, 115, 22, 0.12)',
                    border: '1px solid rgba(249, 115, 22, 0.4)',
                    color: '#f97316',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>Click to Add Project</span>
                  <ArrowRightIcon size={14} />
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {filteredProjects.length === 0 ? (
                <div
                  style={{
                    padding: '40px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ color: '#cbd5e1', fontSize: '1.05rem', marginBottom: '16px' }}>
                    No projects found matching the <strong>"{activeFilter}"</strong> filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('All')}
                    className="btn-card-outline"
                    style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                  >
                    View All Projects
                  </button>
                </div>
              ) : (
                filteredProjects.map((proj) => (
                  <article
                    key={proj.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '32px',
                      padding: '28px',
                      borderRadius: '24px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      alignItems: 'center',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Delete Project Action */}
                    <button
                      type="button"
                      onClick={(e) => handleRemoveProject(proj.id, e)}
                      title="Delete this project"
                      style={{
                        position: 'absolute',
                        top: '18px',
                        right: '18px',
                        background: 'rgba(239, 68, 68, 0.12)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#ef4444',
                        zIndex: 10,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#ef4444';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
                        e.currentTarget.style.color = '#ef4444';
                      }}
                    >
                      <TrashIcon size={14} color="currentColor" />
                    </button>

                    {/* Visual Thumbnail / Graphic */}
                    <div
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '16px',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedProject(proj)}
                      title="Click to view project details"
                    >
                      {proj.thumbnail ? (
                        <img
                          src={proj.thumbnail}
                          alt={proj.title}
                          style={{
                            width: '100%',
                            height: '240px',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '240px',
                            borderRadius: '16px',
                            background:
                              'linear-gradient(135deg, rgba(249, 115, 22, 0.14) 0%, rgba(12, 18, 25, 0.95) 100%)',
                            border: '1px solid rgba(249, 115, 22, 0.3)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                          }}
                        >
                          <div
                            style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '14px',
                              background: 'rgba(249, 115, 22, 0.15)',
                              border: '1px solid rgba(249, 115, 22, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <CodeIcon size={28} color="#f97316" />
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f97316' }}>
                            {proj.category || 'Data Analytics Project'}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Click to view details</span>
                        </div>
                      )}

                      {/* Domain Tag Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '14px',
                          left: '14px',
                          background: 'rgba(12, 18, 25, 0.88)',
                          border: '1px solid rgba(249, 115, 22, 0.4)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#f97316',
                        }}
                      >
                        {proj.domain || 'Data Analytics'}
                      </div>
                    </div>

                    {/* Details Column */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#f97316',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {proj.category}
                        </span>
                        {proj.createdAt && (
                          <>
                            <span style={{ color: '#475569' }}>•</span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{proj.createdAt}</span>
                          </>
                        )}
                      </div>

                      <h3
                        style={{
                          fontSize: '1.45rem',
                          fontWeight: 800,
                          color: '#ffffff',
                          marginBottom: '12px',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.3,
                        }}
                      >
                        {proj.title}
                      </h3>

                      <p
                        style={{
                          fontSize: '0.98rem',
                          color: '#cbd5e1',
                          lineHeight: 1.65,
                          marginBottom: '20px',
                        }}
                      >
                        {proj.summary}
                      </p>

                      {/* Impact Metric Badges */}
                      {proj.metrics && proj.metrics.length > 0 && (
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${Math.min(proj.metrics.length, 3)}, 1fr)`,
                            gap: '12px',
                            marginBottom: '20px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                          }}
                        >
                          {proj.metrics.map((m, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f97316' }}>
                                {m.val}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Tags */}
                      {proj.stack && proj.stack.length > 0 && (
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            marginBottom: '24px',
                          }}
                        >
                          {proj.stack.map((tech) => (
                            <span
                              key={tech}
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons Row */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          gap: '12px',
                          marginTop: 'auto',
                        }}
                      >
                        {/* Dedicated 'Code & SQL' Button (Opens GitHub Repository) */}
                        <a
                          href={proj.githubLink || 'https://github.com'}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary"
                          style={{
                            padding: '10px 22px',
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none',
                            cursor: 'pointer',
                          }}
                          title={`Open ${proj.title} repository on GitHub`}
                        >
                          <GithubIcon size={17} />
                          <span>Code &amp; SQL</span>
                          <ExternalLinkIcon size={14} />
                        </a>

                        {/* Optional Live Demo / Dashboard Button */}
                        {proj.demoLink && proj.demoLink !== '#' && (
                          <a
                            href={proj.demoLink}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-card-outline"
                            style={{
                              padding: '10px 18px',
                              fontSize: '0.88rem',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              textDecoration: 'none',
                            }}
                          >
                            <span>Live Dashboard</span>
                            <ExternalLinkIcon size={14} />
                          </a>
                        )}

                        {/* Quick View Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedProject(proj)}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#cbd5e1',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                            e.currentTarget.style.color = '#cbd5e1';
                          }}
                        >
                          <span>Details</span>
                          <ArrowRightIcon size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}

              {/* Appended "+ Add Another Project" Action Card at the end of the list */}
              <div
                onClick={handleOpenAddModal}
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '2px dashed rgba(249, 115, 22, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(249, 115, 22, 0.06)';
                  e.currentTarget.style.borderColor = '#f97316';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.015)';
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.15)',
                    border: '1px solid rgba(249, 115, 22, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PlusIcon size={20} color="#f97316" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    + Add Another Project to Your Portfolio
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                    Attach your GitHub repository, SQL queries, metrics, and dashboard link anytime.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* =========================================================================
            SECTION 3: DATA METHODOLOGY & TECHNICAL TOOLKIT STACK
           ========================================================================= */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}
            >
              Analytical Methodology &amp; Toolkit
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
              A disciplined, reproducible data lifecycle followed across all analytics workflows,
              ensuring statistical validity from raw ingestion to executive presentation.
            </p>
          </div>

          {/* 5-Step Process */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '50px',
            }}
          >
            {methodologySteps.map((step) => (
              <div
                key={step.num}
                style={{
                  padding: '24px 18px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f97316', marginBottom: '10px' }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Core Technical Stack Matrix */}
          <div
            style={{
              padding: '32px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
              Data Analyst Technical Tooling Matrix
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                {
                  category: 'Querying & Databases',
                  tools: ['PostgreSQL', 'MySQL', 'Google BigQuery', 'Complex Joins', 'CTEs & Window Functions'],
                },
                {
                  category: 'Programming & Analysis',
                  tools: ['Python (Pandas, NumPy)', 'Matplotlib & Seaborn', 'Scikit-Learn (Classification, Regression)', 'Jupyter Notebooks'],
                },
                {
                  category: 'Business Intelligence',
                  tools: ['Power BI (DAX, Power Query)', 'Tableau Desktop & Public', 'Executive Scorecards', 'Story Mapping'],
                },
                {
                  category: 'Spreadsheets & Statistics',
                  tools: ['Advanced Excel (XLOOKUP, Pivot Tables)', 'Hypothesis Testing (t-tests, ANOVA)', 'A/B Testing & Correlation'],
                },
              ].map((cat, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f97316', marginBottom: '10px' }}>
                    {cat.category}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {cat.tools.map((t) => (
                      <div
                        key={t}
                        style={{
                          fontSize: '0.85rem',
                          color: '#cbd5e1',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span style={{ color: '#f97316' }}>•</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: CALL TO ACTION BANNER
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
              Interested in Collaborating on a Project?
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
              Whether you need clean SQL data models, predictive Python analyses, or interactive Power BI dashboards, I am ready to deliver tangible results.
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
                onClick={handleOpenAddModal}
                className="btn-primary"
                style={{ padding: '12px 26px', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                <span>+ Add New Project</span>
                <PlusIcon size={16} color="#000000" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('skills')}
                className="btn-card-outline"
                style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                <span>View Technical Skills</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('experience')}
                className="btn-card-outline"
                style={{ padding: '12px 24px', fontSize: '0.95rem', cursor: 'pointer' }}
              >
                <span>View Experience</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          PROJECT DETAILS LIGHTBOX MODAL
         ========================================================================= */}
      {selectedProject && (
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
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#0d141e',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#ffffff',
                width: '34px',
                height: '34px',
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

            {/* Thumbnail or Fallback */}
            {selectedProject.thumbnail ? (
              <img
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                style={{
                  width: '100%',
                  maxHeight: '340px',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  marginBottom: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.4)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '180px',
                  borderRadius: '16px',
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
                <CodeIcon size={44} color="#f97316" />
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f97316' }}>
                  {selectedProject.category}
                </span>
              </div>
            )}

            {/* Tags & Domain */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  border: '1px solid rgba(249, 115, 22, 0.4)',
                  color: '#f97316',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                {selectedProject.domain}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {selectedProject.category}
              </span>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px', lineHeight: 1.3 }}>
              {selectedProject.title}
            </h3>

            <p style={{ fontSize: '0.96rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '22px' }}>
              {selectedProject.summary}
            </p>

            {/* Metrics */}
            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(selectedProject.metrics.length, 3)}, 1fr)`,
                  gap: '12px',
                  marginBottom: '22px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f97316' }}>{m.val}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Stack Tags */}
            {selectedProject.stack && selectedProject.stack.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '26px' }}>
                {selectedProject.stack.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Buttons in Modal */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a
                href={selectedProject.githubLink || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  textAlign: 'center',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                <GithubIcon size={18} />
                <span>Code &amp; SQL (GitHub)</span>
                <ExternalLinkIcon size={14} />
              </a>

              {selectedProject.demoLink && selectedProject.demoLink !== '#' && (
                <a
                  href={selectedProject.demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-card-outline"
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    textAlign: 'center',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <span>Open Live Dashboard</span>
                  <ExternalLinkIcon size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD PROJECT MODAL: FORM & CODE INSTRUCTIONS
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
              maxWidth: '680px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              background: '#0d141e',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              borderRadius: '24px',
              padding: '30px',
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
                top: '18px',
                right: '18px',
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

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  border: '1px solid rgba(249, 115, 22, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CodeIcon size={24} color="#f97316" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                  Add Data Analytics Project
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '3px' }}>
                  Showcase your real project with GitHub repository code, SQL scripts, metrics &amp; visuals
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
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeAddTab === 'form' ? '#f97316' : 'transparent',
                  color: activeAddTab === 'form' ? '#000000' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.84rem',
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
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeAddTab === 'code' ? '#f97316' : 'transparent',
                  color: activeAddTab === 'code' ? '#000000' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Code Instructions (src/ProjectsPage.jsx)
              </button>
            </div>

            {activeAddTab === 'form' ? (
              <form onSubmit={handleAddProject}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
                  {/* Project Title */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Financial Risk & Loan Default Analysis"
                      value={newProjForm.title}
                      onChange={(e) => setNewProjForm({ ...newProjForm, title: e.target.value })}
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

                  {/* Category & Domain */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                        Category *
                      </label>
                      <select
                        value={newProjForm.category}
                        onChange={(e) => setNewProjForm({ ...newProjForm, category: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: '#161f2e',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      >
                        <option value="Python & SQL">Python &amp; SQL</option>
                        <option value="Power BI & Tableau">Power BI &amp; Tableau</option>
                        <option value="Statistical Analysis">Statistical Analysis</option>
                        <option value="Machine Learning & AI">Machine Learning &amp; AI</option>
                        <option value="Data Engineering & ETL">Data Engineering &amp; ETL</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                        Industry / Domain
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., FinTech & Banking / Healthcare / Retail"
                        value={newProjForm.domain}
                        onChange={(e) => setNewProjForm({ ...newProjForm, domain: e.target.value })}
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

                  {/* GitHub Repository URL (For 'Code & SQL' Button) */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      GitHub Repository URL (Opens via 'Code &amp; SQL' Button) *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="url"
                        required
                        placeholder="https://github.com/anantsingh/financial-risk-analysis"
                        value={newProjForm.githubLink}
                        onChange={(e) => setNewProjForm({ ...newProjForm, githubLink: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px 10px 38px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(249, 115, 22, 0.4)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          outline: 'none',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#f97316',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <GithubIcon size={16} />
                      </div>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                      Each project card features a dedicated <strong>"Code &amp; SQL"</strong> button that opens this repository in a new tab.
                    </span>
                  </div>

                  {/* Optional Live Demo / Dashboard Link */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Live Dashboard or Demo URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="e.g., https://public.tableau.com/views/... or Power BI Web link"
                      value={newProjForm.demoLink}
                      onChange={(e) => setNewProjForm({ ...newProjForm, demoLink: e.target.value })}
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

                  {/* Project Summary / Problem Statement */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Project Summary &amp; Business Impact *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the business problem, your data cleaning & SQL analysis process, findings, and the strategic ROI delivered..."
                      value={newProjForm.summary}
                      onChange={(e) => setNewProjForm({ ...newProjForm, summary: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Tech Stack (Comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., SQL (PostgreSQL), Python, Pandas, Power BI, DAX, Seaborn"
                      value={newProjForm.stack}
                      onChange={(e) => setNewProjForm({ ...newProjForm, stack: e.target.value })}
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

                  {/* 3 Key Impact Metrics */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Key Impact Metrics (Quantifiable Outcomes)
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      <div>
                        <input
                          type="text"
                          placeholder="Val: 84.2%"
                          value={newProjForm.metric1Val}
                          onChange={(e) => setNewProjForm({ ...newProjForm, metric1Val: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#f97316',
                            fontWeight: 700,
                            fontSize: '0.84rem',
                            outline: 'none',
                            marginBottom: '4px',
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Label: ROC-AUC"
                          value={newProjForm.metric1Label}
                          onChange={(e) => setNewProjForm({ ...newProjForm, metric1Label: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: '#cbd5e1',
                            fontSize: '0.75rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Val: 7,043"
                          value={newProjForm.metric2Val}
                          onChange={(e) => setNewProjForm({ ...newProjForm, metric2Val: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#f97316',
                            fontWeight: 700,
                            fontSize: '0.84rem',
                            outline: 'none',
                            marginBottom: '4px',
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Label: Records"
                          value={newProjForm.metric2Label}
                          onChange={(e) => setNewProjForm({ ...newProjForm, metric2Label: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: '#cbd5e1',
                            fontSize: '0.75rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Val: $140k+"
                          value={newProjForm.metric3Val}
                          onChange={(e) => setNewProjForm({ ...newProjForm, metric3Val: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#f97316',
                            fontWeight: 700,
                            fontSize: '0.84rem',
                            outline: 'none',
                            marginBottom: '4px',
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Label: ARR Saved"
                          value={newProjForm.metric3Label}
                          onChange={(e) => setNewProjForm({ ...newProjForm, metric3Label: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: '#cbd5e1',
                            fontSize: '0.75rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail / Image Upload */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Project Screenshot or Diagram (Upload File or Enter URL)
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{
                          fontSize: '0.82rem',
                          color: '#cbd5e1',
                          flex: 1,
                        }}
                      />
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>or URL:</span>
                      <input
                        type="text"
                        placeholder="/project-sample.png"
                        value={newProjForm.thumbnail.startsWith('data:') ? 'Custom file attached' : newProjForm.thumbnail}
                        onChange={(e) => setNewProjForm({ ...newProjForm, thumbnail: e.target.value })}
                        style={{
                          flex: 1,
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
                    {newProjForm.thumbnail && (
                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={newProjForm.thumbnail}
                          alt="Preview"
                          style={{
                            width: '60px',
                            height: '42px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            border: '1px solid rgba(249, 115, 22, 0.4)',
                          }}
                        />
                        <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>
                          ✓ Image preview loaded successfully
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      flex: 1,
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
                    <span>+ Add Project to Portfolio</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn-card-outline"
                    style={{ padding: '12px 20px', fontSize: '0.92rem', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '14px' }}>
                  If you want your projects permanently compiled into the repository code (so they load automatically for any visitor without relying on browser localStorage), you can also add them directly to the projects state in <code>src/ProjectsPage.jsx</code>.
                </p>

                <div
                  style={{
                    position: 'relative',
                    background: '#070a0e',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '16px',
                    overflowX: 'auto',
                  }}
                >
                  <button
                    type="button"
                    onClick={copyCodeSnippet}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: copiedCode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: copiedCode ? '#4ade80' : '#ffffff',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {copiedCode ? '✓ Copied!' : 'Copy Code'}
                  </button>

                  <pre
                    style={{
                      margin: 0,
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      color: '#38bdf8',
                      lineHeight: 1.5,
                    }}
                  >
                    {sampleCodeSnippet}
                  </pre>
                </div>

                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(249, 115, 22, 0.08)',
                    border: '1px solid rgba(249, 115, 22, 0.25)',
                    color: '#f97316',
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                  }}
                >
                  💡 <strong>Tip:</strong> The "Quick Add via Form" tab saves instantly to your browser storage and updates the page immediately.
                </div>
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
