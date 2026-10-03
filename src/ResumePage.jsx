import React, { useState, useEffect } from 'react';
import {
  fetchExperiencesService,
  fetchProjectsService,
  fetchCertificatesService,
} from './supabase';
import {
  DownloadIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
  AwardIcon,
  BriefcaseIcon,
  CodeIcon,
} from './Icons';

export default function ResumePage({ onNavigate, isModal = false, onClose }) {
  // Load dynamic data from localStorage
  const [experiences, setExperiences] = useState(() => {
    try {
      const saved = localStorage.getItem('anant_portfolio_experience');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem('anant_portfolio_certificates');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return parsed.filter(
        (c) =>
          !['cert-1', 'cert-2', 'cert-3'].includes(c.id) &&
          !c.title?.includes('Dummy')
      );
    } catch (e) {
      return [];
    }
  });

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

  // Fetch fresh data from Supabase on mount
  useEffect(() => {
    fetchExperiencesService().then((data) => {
      if (data && Array.isArray(data)) setExperiences(data);
    });
    fetchCertificatesService().then((data) => {
      if (data && Array.isArray(data)) setCertificates(data);
    });
    fetchProjectsService().then((data) => {
      if (data && Array.isArray(data)) setProjects(data);
    });
  }, []);

  // Listen for storage changes if user adds experience or certifications in another tab
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedExp = localStorage.getItem('anant_portfolio_experience');
        if (savedExp) setExperiences(JSON.parse(savedExp));

        const savedCert = localStorage.getItem('anant_portfolio_certificates');
        if (savedCert) {
          const parsed = JSON.parse(savedCert);
          setCertificates(
            parsed.filter(
              (c) => !['cert-1', 'cert-2', 'cert-3'].includes(c.id) && !c.title?.includes('Dummy')
            )
          );
        }

        const savedProj = localStorage.getItem('anant_portfolio_projects');
        if (savedProj) {
          const parsedProj = JSON.parse(savedProj);
          const dummyIds = ['churn', 'sales-bi', 'supply-chain', 'hr-attrition'];
          setProjects(parsedProj.filter((p) => !dummyIds.includes(p.id)));
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Determine section scaling to guarantee 1-page fit
  const hasExperience = experiences.length > 0;
  const hasCertificates = certificates.length > 0;

  // Cap items so resume NEVER overflows single A4 page
  const displayExperiences = experiences.slice(0, 2);
  const displayCertificates = certificates.slice(0, 2);
  const displayProjects = projects.slice(0, hasExperience && hasCertificates ? 2 : 3);

  return (
    <div
      style={{
        position: isModal ? 'fixed' : 'relative',
        inset: isModal ? 0 : 'auto',
        zIndex: isModal ? 250 : 'auto',
        minHeight: '100vh',
        width: '100%',
        background: isModal ? 'rgba(0, 0, 0, 0.88)' : '#0c1219',
        backdropFilter: isModal ? 'blur(12px)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: isModal ? '24px 16px' : '40px 16px 80px 16px',
        overflowY: 'auto',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* =========================================================================
          TOP ACTION TOOLBAR (HIDDEN IN PRINT)
         ========================================================================= */}
      <div
        className="no-print"
        style={{
          maxWidth: '850px',
          width: '100%',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '14px 20px',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isModal ? (
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              ✕ Close
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              ← Back to Portfolio
            </button>
          )}

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              color: '#4ade80',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            <span>⚡ Auto-Synced 1-Page Resume</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Primary Save as 1-Page PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(249, 115, 22, 0.4)',
            }}
            title="Open browser print dialog to save as single-page PDF"
          >
            <span>🖨️ Save as 1-Page PDF</span>
          </button>

          {/* Direct Base PDF Download Link */}
          <a
            href="/Anant_Singh_Resume.pdf"
            download="Anant_Singh_Resume.pdf"
            className="btn-card-outline"
            style={{
              padding: '10px 16px',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
          >
            <DownloadIcon size={15} />
            <span>Download Static PDF</span>
          </a>
        </div>
      </div>

      {/* Mobile inspection hint banner */}
      <div
        className="no-print"
        style={{
          fontSize: '0.8rem',
          color: '#94a3b8',
          marginBottom: '14px',
          textAlign: 'center',
          maxWidth: '850px',
          padding: '0 10px',
        }}
      >
        💡 <strong style={{ color: '#cbd5e1' }}>Tip:</strong> The preview below matches exact single-page A4 print format. On mobile, scroll horizontally or tap "Save as 1-Page PDF".
      </div>

      {/* Responsive Preview Wrapper for Mobile & Desktop */}
      <div
        className="resume-preview-wrapper"
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '24px',
        }}
      >
        {/* =========================================================================
            THE STRICT 1-PAGE RESUME DOCUMENT CONTAINER
            Engineered to fit precisely on a single A4 / Letter page (max-height: 297mm)
            Color scheme: Blue for URLs, Black for everything else
           ========================================================================= */}
        <div
          id="resume-document"
          className="resume-page-container"
          style={{
            width: '210mm',
            minHeight: '297mm',
            maxHeight: '297mm',
          background: '#ffffff',
          color: '#000000',
          padding: hasExperience && hasCertificates ? '9mm 12mm' : '11mm 13mm',
          boxSizing: 'border-box',
          overflow: 'hidden',
          borderRadius: isModal ? '8px' : '4px',
          boxShadow: '0 15px 45px rgba(0, 0, 0, 0.65)',
          fontFamily: "'Helvetica Neue', Arial, 'Plus Jakarta Sans', sans-serif",
          fontSize: '8.5pt',
          lineHeight: 1.3,
          position: 'relative',
        }}
      >
        {/* HEADER */}
        <header
          style={{
            borderBottom: '2px solid #000000',
            paddingBottom: '4px',
            marginBottom: '6px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '19pt',
                  fontWeight: 800,
                  color: '#000000',
                  letterSpacing: '-0.5px',
                  margin: 0,
                  lineHeight: 1.05,
                }}
              >
                ANANT SINGH
              </h1>
              <div
                style={{
                  fontSize: '9.5pt',
                  fontWeight: 700,
                  color: '#000000',
                  marginTop: '1px',
                  marginBottom: '3px',
                }}
              >
                Fresher Data Analyst &bull; SQL &bull; Python &bull; Power BI &bull; Advanced Excel
              </div>
            </div>

            <div
              style={{
                textAlign: 'right',
                fontSize: '7.8pt',
                color: '#000000',
                lineHeight: 1.3,
              }}
            >
              <div>India (Open to Remote / Relocation)</div>
              <div>Available for Immediate Start</div>
            </div>
          </div>

          <div
            style={{
              fontSize: '8pt',
              color: '#000000',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '1px',
            }}
          >
            <span>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:anant.221002@gmail.com"
                style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 600 }}
              >
                anant.221002@gmail.com
              </a>
            </span>
            <span>&bull;</span>
            <span>
              <strong>LinkedIn:</strong>{' '}
              <a
                href="https://www.linkedin.com/in/anant-singh-se"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 600 }}
              >
                linkedin.com/in/anant-singh-se
              </a>
            </span>
            <span>&bull;</span>
            <span>
              <strong>GitHub:</strong>{' '}
              <a
                href="https://github.com/Aravanant"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 600 }}
              >
                github.com/Aravanant
              </a>
            </span>
          </div>
        </header>

        {/* PROFESSIONAL SUMMARY */}
        <section style={{ marginBottom: '5px' }}>
          <div
            style={{
              fontSize: '9pt',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              color: '#000000',
              borderBottom: '1px solid #000000',
              paddingBottom: '1px',
              marginBottom: '3px',
            }}
          >
            Professional Summary
          </div>
          <p style={{ margin: 0, color: '#000000', fontSize: '8.2pt', lineHeight: 1.32 }}>
            Proactive Entry-Level Data Analyst with strong technical competence in relational SQL querying (CTEs, window functions, schema design), Python statistical analytics (Pandas, NumPy, Scikit-Learn), and executive Business Intelligence reporting (Power BI, DAX, Tableau). Passionate about turning complex datasets into actionable business insights, automated workflows, and quantifiable value.
          </p>
        </section>

        {/* TECHNICAL SKILLS MATRIX */}
        <section style={{ marginBottom: '5px' }}>
          <div
            style={{
              fontSize: '9pt',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              color: '#000000',
              borderBottom: '1px solid #000000',
              paddingBottom: '1px',
              marginBottom: '3px',
            }}
          >
            Technical Skills
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '125px 1fr',
              rowGap: '1.5px',
              fontSize: '8.2pt',
              lineHeight: 1.28,
            }}
          >
            <div style={{ fontWeight: 700, color: '#000000' }}>Databases &amp; SQL:</div>
            <div style={{ color: '#000000' }}>
              SQL (PostgreSQL, MySQL), Complex Joins, Window Functions, CTEs, Aggregations, Query Tuning
            </div>

            <div style={{ fontWeight: 700, color: '#000000' }}>Python &amp; Analytics:</div>
            <div style={{ color: '#000000' }}>
              Python, Pandas, NumPy, Scikit-Learn (Classification, Regression), Data Wrangling, EDA, Statistical Hypothesis Testing
            </div>

            <div style={{ fontWeight: 700, color: '#000000' }}>BI &amp; Visualization:</div>
            <div style={{ color: '#000000' }}>
              Power BI, DAX Measures, Power Query, Data Modeling (Star Schema), Tableau Desktop, Seaborn, Matplotlib
            </div>

            <div style={{ fontWeight: 700, color: '#000000' }}>Spreadsheets &amp; Tools:</div>
            <div style={{ color: '#000000' }}>
              Advanced Excel (XLOOKUP, Pivot Tables, What-If Analysis), Git/GitHub, Jupyter Notebooks, VS Code
            </div>
          </div>
        </section>

        {/* WORK / INTERNSHIP EXPERIENCE SECTION (DYNAMICALLY AUTO-SYNCED) */}
        <section style={{ marginBottom: '5px' }}>
          <div
            style={{
              fontSize: '9pt',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              color: '#000000',
              borderBottom: '1px solid #000000',
              paddingBottom: '1px',
              marginBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span>{hasExperience ? 'Work & Internship Experience' : 'Experience & Practical Analytics Consulting'}</span>
            <span style={{ fontSize: '7.2pt', color: '#000000', fontWeight: 600, textTransform: 'none' }}>
              {hasExperience ? 'Verified Roles' : 'Hands-on Projects'}
            </span>
          </div>

          {hasExperience ? (
            displayExperiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontSize: '8.8pt', fontWeight: 700, color: '#000000' }}>
                      {exp.role}
                    </span>{' '}
                    <span style={{ color: '#000000' }}>&bull;</span>{' '}
                    <span style={{ fontSize: '8.8pt', fontWeight: 700, color: '#000000' }}>
                      {exp.company}
                    </span>
                    {exp.type && (
                      <span style={{ fontSize: '7.5pt', color: '#000000', marginLeft: '6px' }}>
                        ({exp.type})
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '7.8pt', color: '#000000', fontWeight: 600 }}>
                    {exp.duration || 'Recent'} | {exp.location || 'Remote'}
                  </span>
                </div>

                <ul
                  style={{
                    margin: '1px 0 0 0',
                    paddingLeft: '13px',
                    fontSize: '8.2pt',
                    color: '#000000',
                    lineHeight: 1.28,
                  }}
                >
                  {exp.responsibilities && exp.responsibilities.length > 0 ? (
                    exp.responsibilities.slice(0, 2).map((r, idx) => <li key={idx}>{r}</li>)
                  ) : (
                    <li>Conducted database queries, exploratory data analysis, and dashboard reporting.</li>
                  )}
                </ul>

                {/* Verification URL (Blue font) */}
                {exp.verificationUrl && exp.verificationUrl !== '#' && (
                  <div style={{ fontSize: '7.5pt', marginTop: '1px', paddingLeft: '13px' }}>
                    <a
                      href={exp.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 600 }}
                    >
                      Credential Verification URL ↗
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: '8.8pt', fontWeight: 700, color: '#000000' }}>
                    Data Analytics Developer &amp; Project Consultant
                  </span>{' '}
                  <span style={{ color: '#000000' }}>&bull;</span>{' '}
                  <span style={{ fontSize: '8.8pt', fontWeight: 700, color: '#000000' }}>
                    Independent Business Engagements
                  </span>
                </div>
                <span style={{ fontSize: '7.8pt', color: '#000000', fontWeight: 600 }}>
                  2023 &ndash; Present | Remote
                </span>
              </div>
              <ul
                style={{
                  margin: '1px 0 0 0',
                  paddingLeft: '13px',
                  fontSize: '8.2pt',
                  color: '#000000',
                  lineHeight: 1.28,
                }}
              >
                <li>
                  Engineered end-to-end data pipelines: ingested, cleaned, and normalized 100,000+ relational database records with complex SQL CTEs and Python Pandas.
                </li>
                <li>
                  Architected executive-facing Power BI dashboards with DAX calculated measures, identifying actionable customer retention and default mitigation strategies.
                </li>
              </ul>
            </div>
          )}
        </section>

        {/* FEATURED DATA ANALYTICS PROJECTS */}
        <section style={{ marginBottom: '5px' }}>
          <div
            style={{
              fontSize: '9pt',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              color: '#000000',
              borderBottom: '1px solid #000000',
              paddingBottom: '1px',
              marginBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span>Key Data Analytics Projects</span>
            <span style={{ fontSize: '7.2pt', color: '#000000', fontWeight: 600, textTransform: 'none' }}>
              Code &amp; SQL on GitHub
            </span>
          </div>

          {displayProjects.length > 0 ? (
            displayProjects.map((p) => (
              <div key={p.id} style={{ marginBottom: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontSize: '8.8pt', fontWeight: 700, color: '#000000' }}>
                      {p.title}
                    </span>
                    <span style={{ fontSize: '7.8pt', color: '#000000', fontWeight: 600, marginLeft: '6px' }}>
                      ({p.stack ? (Array.isArray(p.stack) ? p.stack.slice(0, 4).join(', ') : p.stack) : 'SQL, Python'})
                    </span>
                  </div>
                  {p.githubLink && (
                    <a
                      href={p.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '7.5pt', color: '#0066cc', textDecoration: 'none', fontWeight: 600 }}
                    >
                      Code &amp; SQL ↗
                    </a>
                  )}
                </div>
                <div style={{ fontSize: '8.2pt', color: '#000000', lineHeight: 1.28, marginTop: '1px' }}>
                  {p.summary}
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Project 1 */}
              <div style={{ marginBottom: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontSize: '8.8pt', fontWeight: 700, color: '#000000' }}>
                      Financial Risk &amp; Loan Default Analysis
                    </span>
                    <span style={{ fontSize: '7.8pt', color: '#000000', fontWeight: 600, marginLeft: '6px' }}>
                      (SQL &bull; Python &bull; Power BI)
                    </span>
                  </div>
                  <a
                    href="https://github.com/Aravanant"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '7.5pt', color: '#0066cc', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Code &amp; SQL ↗
                  </a>
                </div>
                <div style={{ fontSize: '8.2pt', color: '#000000', lineHeight: 1.28, marginTop: '1px' }}>
                  Queried 15,000+ borrower loan accounts via PostgreSQL window functions; engineered credit risk tiers in Python with 84.2% ROC-AUC accuracy. Constructed an interactive Power BI dashboard tracking default rates.
                </div>
              </div>

              {/* Project 2 */}
              <div style={{ marginBottom: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontSize: '8.8pt', fontWeight: 700, color: '#000000' }}>
                      Customer Churn Prediction &amp; Retention Analytics
                    </span>
                    <span style={{ fontSize: '7.8pt', color: '#000000', fontWeight: 600, marginLeft: '6px' }}>
                      (Python &bull; SQL &bull; Scikit-Learn &bull; Tableau)
                    </span>
                  </div>
                  <a
                    href="https://github.com/Aravanant"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '7.5pt', color: '#0066cc', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Code &amp; SQL ↗
                  </a>
                </div>
                <div style={{ fontSize: '8.2pt', color: '#000000', lineHeight: 1.28, marginTop: '1px' }}>
                  Audited 7,043 customer accounts; addressed contract churn drivers and class imbalance using SMOTE. Built Random Forest classifier identifying key churn predictors, projecting $140k+ in annual recurring revenue retention.
                </div>
              </div>
            </>
          )}
        </section>

        {/* CERTIFICATIONS & CREDENTIALS SECTION (VIA URL) */}
        <section style={{ marginBottom: '5px' }}>
          <div
            style={{
              fontSize: '9pt',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              color: '#000000',
              borderBottom: '1px solid #000000',
              paddingBottom: '1px',
              marginBottom: '3px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span>Certifications &amp; Professional Credentials</span>
            <span style={{ fontSize: '7.2pt', color: '#000000', fontWeight: 600, textTransform: 'none' }}>
              Online Verification Links
            </span>
          </div>

          {hasCertificates ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {displayCertificates.map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    fontSize: '8.2pt',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: '#000000' }}>{cert.title}</span>
                    <span style={{ color: '#000000', marginLeft: '6px' }}>
                      &bull; {cert.issuer} ({cert.issueDate})
                    </span>
                    {cert.credentialId && (
                      <span style={{ color: '#000000', fontSize: '7.5pt', marginLeft: '6px' }}>
                        [ID: {cert.credentialId}]
                      </span>
                    )}
                  </div>

                  {cert.verificationUrl && cert.verificationUrl !== '#' ? (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: '#0066cc',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '7.5pt',
                        flexShrink: 0,
                        marginLeft: '8px',
                      }}
                    >
                      Verify Credential ↗
                    </a>
                  ) : (
                    <span style={{ color: '#000000', fontSize: '7.5pt', fontWeight: 600 }}>
                      Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                fontSize: '8.2pt',
              }}
            >
              <div>
                <span style={{ fontWeight: 700, color: '#000000' }}>
                  Microsoft Certified: Power BI Data Analyst Associate
                </span>
                <span style={{ color: '#000000', marginLeft: '6px' }}>
                  &bull; Microsoft (PL-300 Credential)
                </span>
              </div>
              <a
                href="https://learn.microsoft.com/credentials"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#0066cc',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '7.5pt',
                }}
              >
                Verify Credential URL ↗
              </a>
            </div>
          )}
        </section>

        {/* EDUCATION */}
        <section style={{ marginBottom: 0 }}>
          <div
            style={{
              fontSize: '9pt',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              color: '#000000',
              borderBottom: '1px solid #000000',
              paddingBottom: '1px',
              marginBottom: '2px',
            }}
          >
            Education
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              fontSize: '8.2pt',
            }}
          >
            <div>
              <span style={{ fontWeight: 700, color: '#000000' }}>
                Bachelor of Technology &bull; Computer Science &amp; Engineering
              </span>
              <div style={{ color: '#000000', fontSize: '7.8pt', marginTop: '1px' }}>
                Relevant Coursework: Database Management Systems (DBMS), Statistics &amp; Probability, Business Intelligence.
              </div>
            </div>
            <span style={{ color: '#000000', fontWeight: 600, fontSize: '7.8pt' }}>Graduation: 2024</span>
          </div>
        </section>

        {/* TWO-COLOR ENFORCEMENT & PRINT STYLES */}
        <style>{`
          #resume-document,
          #resume-document *:not(a) {
            color: #000000 !important;
          }
          #resume-document a {
            color: #0066cc !important;
            text-decoration: none;
          }
          #resume-document a:hover {
            color: #0052a3 !important;
            text-decoration: underline;
          }
          @media print {
            @page {
              size: A4 portrait;
              margin: 0;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
              color: #000000 !important;
              height: 100% !important;
              overflow: hidden !important;
            }
            .no-print {
              display: none !important;
            }
            .resume-preview-wrapper {
              overflow: visible !important;
              width: 100% !important;
              display: block !important;
              padding: 0 !important;
            }
            #resume-document {
              width: 210mm !important;
              height: 297mm !important;
              max-height: 297mm !important;
              margin: 0 !important;
              padding: 8mm 11mm !important;
              box-shadow: none !important;
              border: none !important;
              border-radius: 0 !important;
              page-break-after: avoid !important;
              page-break-before: avoid !important;
              page-break-inside: avoid !important;
            }
            #resume-document, #resume-document *:not(a) {
              color: #000000 !important;
            }
            #resume-document a {
              color: #0066cc !important;
            }
          }
        `}</style>
      </div>
    </div>
    </div>
  );
}
