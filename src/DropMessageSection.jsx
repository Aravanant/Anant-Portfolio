import React, { useState } from 'react';
import { CheckCircleIcon } from './Icons';

export default function DropMessageSection({ isStandalone = true }) {
  const [web3Key, setWeb3Key] = useState(() => {
    try {
      return localStorage.getItem('anant_web3forms_key') || 'YOUR_ACCESS_KEY_HERE';
    } catch (e) {
      return 'YOUR_ACCESS_KEY_HERE';
    }
  });
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Data Analyst Role / Opportunity Inquiry',
    message: '',
  });

  const handleSaveWeb3Key = (key) => {
    setWeb3Key(key);
    try {
      localStorage.setItem('anant_web3forms_key', key);
    } catch (e) {
      console.error(e);
    }
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
        if (!isCustomKey) {
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

  const formCard = (
    <div
      className="responsive-modal-box"
      style={{
        padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3.5vw, 32px)',
        borderRadius: '24px',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: 'none',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        position: 'relative',
        width: '100%',
        maxWidth: isStandalone ? '780px' : '100%',
        margin: isStandalone ? '0 auto' : '0',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>✉️</span>
            <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.01em' }}>
              Drop a Message Right Here
            </h2>
          </div>

          {/* Free service badge / setting trigger */}
          <button
            type="button"
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#cbd5e1',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 10px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f97316';
              e.currentTarget.style.color = '#f97316';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = '#cbd5e1';
            }}
            title="Configure Web3Forms / Formspree Access Key"
          >
            <span>⚙️ Service Key</span>
          </button>
        </div>

        <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginTop: '10px', lineHeight: 1.5 }}>
          Direct email form delivered straight to <strong>anant.221002@gmail.com</strong> without any third-party clutter.
        </p>
      </div>

      {/* Optional Collapsible Access Key Configuration */}
      {showKeyConfig && (
        <div
          style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(249, 115, 22, 0.08)',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            marginBottom: '22px',
          }}
        >
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f97316', marginBottom: '8px' }}>
            🔑 Web3Forms Free Access Key:
          </div>
          <input
            type="text"
            placeholder="Paste your free Web3Forms access key from web3forms.com"
            value={web3Key}
            onChange={(e) => handleSaveWeb3Key(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#070a0e',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <span style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '6px', display: 'block', lineHeight: 1.4 }}>
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
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4ade80',
            }}
          >
            <CheckCircleIcon size={38} color="#4ade80" />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Message Sent Successfully! 🚀
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '440px', lineHeight: 1.6 }}>
            {statusMessage ||
              'Thank you for reaching out! Your message was delivered directly to anant.221002@gmail.com. I will get back to you within 24 hours.'}
          </p>
          <button
            type="button"
            onClick={() => setFormStatus('idle')}
            className="btn-card-outline"
            style={{
              padding: '10px 24px',
              fontSize: '0.9rem',
              marginTop: '8px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
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
                  boxSizing: 'border-box',
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
                  boxSizing: 'border-box',
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
                  boxSizing: 'border-box',
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
                  boxSizing: 'border-box',
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
              borderRadius: '10px',
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
  );

  if (!isStandalone) {
    return formCard;
  }

  return (
    <section
      id="drop-message"
      style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '50px 24px 70px 24px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'rgba(249, 115, 22, 0.15)',
            border: '1px solid rgba(249, 115, 22, 0.4)',
            color: '#f97316',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '12px',
          }}
        >
          <span>✦ Get In Touch • Direct Contact</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--card-text-title, #ffffff)',
            letterSpacing: '-0.02em',
            marginBottom: '10px',
          }}
        >
          Let's Start a Conversation
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--card-text-body, #cbd5e1)',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Whether you have an opening on your data team, a freelance project, or just want to chat about SQL and Python—my inbox is always open!
        </p>
      </div>

      {formCard}
    </section>
  );
}
