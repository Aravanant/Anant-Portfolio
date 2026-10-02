import React, { useState } from 'react';

export default function DashboardSection() {
  const [activeScale, setActiveScale] = useState('Monthly');

  // Cohesive Accent Orange / Amber / Warm Palette for Donut Breakdown
  const breakdownData = [
    { name: 'Industry', percent: 32, amount: '$2,413', color: '#f97316' }, // Vibrant Orange
    { name: 'Food', percent: 24, amount: '$1,810', color: '#fb923c' },     // Bright Warm Orange
    { name: 'Transport', percent: 17, amount: '$1,282', color: '#f59e0b' },// Warm Amber Gold
    { name: 'Shopping', percent: 14, amount: '$1,055', color: '#ea580c' }, // Deep Coral Orange
    { name: 'Bills', percent: 10, amount: '$754', color: '#fed7aa' },      // Soft Peach Cream
    { name: 'Other', percent: 3, amount: '$228', color: '#e2e8f0' },       // Crisp Light Slate
  ];

  // Transactions with orange/warm accents
  const transactions = [
    { name: 'Auto', desc: 'Car maintenance', amount: '$315.00', change: '75%', color: '#f97316' },
    { name: 'Mall', desc: 'Shopping center', amount: '$1,150.00', change: '50%', color: '#ea580c' },
    { name: 'Fast', desc: 'Express shipping', amount: '$480.00', change: '+41%', color: '#f59e0b' },
    { name: 'Subs', desc: 'Cloud streaming', amount: '$180.00', change: '+12%', color: '#fb923c' },
  ];

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <section
      id="experience"
      style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '30px 24px 60px 24px',
        position: 'relative',
        zIndex: 10,
        background: 'transparent',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'rgba(249, 115, 22, 0.15)',
            border: '1px solid rgba(249, 115, 22, 0.5)',
            color: '#f97316',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '12px',
          }}
        >
          <span>✦ Experience & Featured Showcase</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '10px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
          }}
        >
          Interactive Analytics & FinTech Dashboard
        </h2>

        <p
          style={{
            fontSize: '1.05rem',
            color: '#cbd5e1',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6,
            textShadow: '0 1px 6px rgba(0, 0, 0, 0.6)',
          }}
        >
          High-performance financial visualization interface with real-time data streaming,
          interactive SVG telemetry, and responsive components.
        </p>
      </div>

      {/* Dashboard Grid - Completely transparent, content directly on the background canvas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '24px',
          background: 'transparent',
        }}
      >
        {/* ================= LEFT COLUMN (4 COLS) ================= */}
        <div
          style={{
            gridColumn: 'span 12',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            background: 'transparent',
          }}
          className="lg-span-4"
        >
          {/* Card 1: Balance & Flow Card in Accent Orange Theme */}
          <div
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: 'none',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              color: '#ffffff',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Balance</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>$1,355</div>
              </div>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  border: '1px solid rgba(249, 115, 22, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f97316',
                  boxShadow: '0 0 12px rgba(249, 115, 22, 0.3)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
            </div>

            {/* Masked Card Details & Budget badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                marginBottom: '16px',
                fontSize: '0.85rem',
                color: '#ffffff',
                fontWeight: 600,
              }}
            >
              <span>•••• •••• •••• 1234</span>
              <span style={{ color: '#f97316', fontWeight: 700 }}>Budget used 72%</span>
            </div>

            {/* Total Flow & Flow Wave Mini Chart in Accent Orange */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>$39,854</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '8px', fontWeight: 500 }}>Total Flow</div>

              {/* Mini Wave SVG in Accent Orange */}
              <div style={{ height: '70px', width: '100%', position: 'relative' }}>
                <svg viewBox="0 0 300 70" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="flowOrangeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,55 Q 50,45 80,30 T 150,35 T 220,15 T 300,28 L 300,70 L 0,70 Z"
                    fill="url(#flowOrangeGrad)"
                  />
                  <path
                    d="M 0,55 Q 50,45 80,30 T 150,35 T 220,15 T 300,28"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2.8"
                  />
                  <circle cx="80" cy="30" r="3.5" fill="#fb923c" />
                  <circle cx="150" cy="35" r="3.5" fill="#fb923c" />
                  <circle cx="220" cy="15" r="4.5" fill="#ffffff" stroke="#f97316" strokeWidth="2.2" />
                </svg>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.78rem', color: '#fb923c', cursor: 'pointer', fontWeight: 600 }}>Active stream: Total ▾</span>
              </div>
            </div>

            {/* Monthly Limit Bar in Accent Orange */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '14px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: '#cbd5e1', fontWeight: 500 }}>Month: $21,154 / $30,000</span>
                <span style={{ color: '#f97316', fontWeight: 800 }}>70%</span>
              </div>
              <div style={{ width: '100%', height: '7px', background: 'rgba(255, 255, 255, 0.14)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #ea580c, #f97316)', borderRadius: '4px', boxShadow: '0 0 10px rgba(249, 115, 22, 0.6)' }} />
              </div>
            </div>

            {/* Recent Transactions List - High Contrast Typography */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {transactions.map((tx) => (
                <div
                  key={tx.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 6px',
                    borderRadius: '8px',
                    background: 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: tx.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {tx.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>{tx.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{tx.desc}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>{tx.amount}</div>
                    <div style={{ fontSize: '0.75rem', color: '#f97316', fontWeight: 700 }}>{tx.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Annual Plans Card in Accent Orange Theme */}
          <div
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: 'none',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>Annual Plans</div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '110px', paddingTop: '10px' }}>
              {/* Bar 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '50px',
                    background: 'linear-gradient(180deg, #ea580c 0%, #c2410c 100%)',
                    borderRadius: '6px',
                  }}
                />
                <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>Q1</span>
              </div>

              {/* Bar 2 (Active with Tooltip in Accent Orange) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-24px',
                    background: '#f97316',
                    color: '#ffffff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    boxShadow: '0 2px 8px rgba(249, 115, 22, 0.6)',
                  }}
                >
                  $24.5k
                </div>
                <div
                  style={{
                    width: '32px',
                    height: '80px',
                    background: 'linear-gradient(180deg, #f97316 0%, #fb923c 100%)',
                    borderRadius: '6px',
                    boxShadow: '0 0 16px rgba(249, 115, 22, 0.65)',
                  }}
                />
                <span style={{ fontSize: '0.8rem', color: '#f97316', fontWeight: 800 }}>Active</span>
              </div>

              {/* Bar 3 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '95px',
                    background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '6px',
                  }}
                />
                <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>Target</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (8 COLS) ================= */}
        <div
          style={{
            gridColumn: 'span 12',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            background: 'transparent',
          }}
          className="lg-span-8"
        >
          {/* Card 2: Expense Breakdown Donut Chart in Accent Orange Theme */}
          <div
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: 'none',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>Expense Breakdown</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f97316', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>$7,542</div>
            </div>

            {/* Donut & Legend Container */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                alignItems: 'center',
                gap: '28px',
              }}
            >
              {/* Donut Chart SVG in Warm Orange / Amber Palette */}
              <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
                <svg viewBox="0 0 160 160" width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
                  {/* Industry: 32% (Vibrant Orange) */}
                  <circle cx="80" cy="80" r="54" fill="none" stroke="#f97316" strokeWidth="22" strokeDasharray="108 231" strokeDashoffset="0" />
                  {/* Food: 24% (Warm Orange) */}
                  <circle cx="80" cy="80" r="54" fill="none" stroke="#fb923c" strokeWidth="22" strokeDasharray="81 258" strokeDashoffset="-108" />
                  {/* Transport: 17% (Amber Gold) */}
                  <circle cx="80" cy="80" r="54" fill="none" stroke="#f59e0b" strokeWidth="22" strokeDasharray="57 282" strokeDashoffset="-189" />
                  {/* Shopping: 14% (Deep Coral) */}
                  <circle cx="80" cy="80" r="54" fill="none" stroke="#ea580c" strokeWidth="22" strokeDasharray="47 292" strokeDashoffset="-246" />
                  {/* Bills: 10% (Soft Peach) */}
                  <circle cx="80" cy="80" r="54" fill="none" stroke="#fed7aa" strokeWidth="22" strokeDasharray="33 306" strokeDashoffset="-293" />
                  {/* Other: 3% (Light Slate) */}
                  <circle cx="80" cy="80" r="54" fill="none" stroke="#e2e8f0" strokeWidth="22" strokeDasharray="13 326" strokeDashoffset="-326" />
                </svg>

                {/* Center Text in Donut - Crisp White & High Contrast */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>$7,542</div>
                  <div style={{ fontSize: '0.85rem', color: '#fed7aa', fontWeight: 600 }}>Total</div>
                </div>
              </div>

              {/* Legend & Table - Crisp White & Accent Orange text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {breakdownData.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.92rem',
                      padding: '4px 6px',
                      borderRadius: '6px',
                      background: 'transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                      <span style={{ fontWeight: 600, color: '#ffffff' }}>{item.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <span style={{ color: '#fed7aa', width: '38px', textAlign: 'right', fontWeight: 600 }}>{item.percent}%</span>
                      <span style={{ fontWeight: 700, color: '#ffffff', width: '65px', textAlign: 'right' }}>{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Large Revenue Stats Wave Chart in Accent Orange Theme */}
          <div
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: 'none',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              color: '#ffffff',
            }}
          >
            {/* Header with Title, Scale Filter, Visitors */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>Revenue Stats </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f97316', textShadow: '0 2px 8px rgba(249, 115, 22, 0.5)' }}>$7,510</span>
              </div>

              {/* Scale pill buttons in Accent Orange */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '3px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                }}
              >
                {['Daily', 'Weekly', 'Monthly'].map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setActiveScale(scale)}
                    style={{
                      border: 'none',
                      background: activeScale === scale ? '#f97316' : 'transparent',
                      color: activeScale === scale ? '#ffffff' : '#cbd5e1',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      padding: '5px 14px',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: activeScale === scale ? '0 2px 8px rgba(249, 115, 22, 0.5)' : 'none',
                    }}
                  >
                    {scale}
                  </button>
                ))}
              </div>

              {/* Visitors & Filter Badge in Accent Orange */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
                  <strong style={{ color: '#ffffff' }}>21,281</strong> visitors
                </span>
                <span
                  style={{
                    fontSize: '0.78rem',
                    background: 'rgba(249, 115, 22, 0.15)',
                    color: '#f97316',
                    border: '1px solid rgba(249, 115, 22, 0.45)',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  Filter ▾
                </span>
              </div>
            </div>

            {/* Main Dual-Wave SVG Chart Area in Accent Orange */}
            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
              {/* Y-Axis Grid Lines & Markers - Crisp readable text */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  pointerEvents: 'none',
                }}
              >
                {['125%', '100%', '75%', '50%', '25%', '0%'].map((val) => (
                  <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1', width: '36px', fontWeight: 600 }}>{val}</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.12)' }} />
                  </div>
                ))}
              </div>

              {/* SVG Curved Waves in Accent Orange */}
              <svg
                viewBox="0 0 600 200"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  left: '42px',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: 'calc(100% - 42px)',
                  height: '100%',
                }}
              >
                <defs>
                  <linearGradient id="revenueOrangeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#ea580c" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#11171b" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Shaded Area under lower wave */}
                <path
                  d="M 0,130 C 50,140 100,160 150,145 C 200,130 250,90 300,75 C 350,60 400,95 450,75 C 500,55 550,80 600,65 L 600,200 L 0,200 Z"
                  fill="url(#revenueOrangeGrad)"
                />

                {/* Secondary Upper Trendline (dashed warm amber) */}
                <path
                  d="M 0,100 C 60,80 120,95 180,60 C 240,30 300,50 360,35 C 420,20 480,55 540,40 C 570,35 590,45 600,42"
                  fill="none"
                  stroke="#fb923c"
                  strokeWidth="2.2"
                  strokeDasharray="4 4"
                  opacity="0.9"
                />

                {/* Primary Solid Wave in Accent Orange */}
                <path
                  d="M 0,130 C 50,140 100,160 150,145 C 200,130 250,90 300,75 C 350,60 400,95 450,75 C 500,55 550,80 600,65"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3.4"
                />

                {/* Glowing Nodes with Pin Tooltips in Accent Orange */}
                {/* Node 1: $145 at APR */}
                <circle cx="150" cy="145" r="4.5" fill="#ffffff" stroke="#f97316" strokeWidth="2.5" />
                <rect x="130" y="116" width="40" height="20" rx="4" fill="#f97316" />
                <text x="150" y="130" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">$145</text>

                {/* Node 2: $312 at MAY */}
                <circle cx="250" cy="90" r="4.5" fill="#ffffff" stroke="#f97316" strokeWidth="2.5" />
                <rect x="230" y="60" width="40" height="20" rx="4" fill="#f97316" />
                <text x="250" y="74" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">$312</text>

                {/* Node 3: $450 at JUN */}
                <circle cx="300" cy="75" r="5.5" fill="#ffffff" stroke="#ea580c" strokeWidth="2.5" />
                <rect x="280" y="44" width="40" height="20" rx="4" fill="#ea580c" stroke="#f97316" strokeWidth="1" />
                <text x="300" y="58" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">$450</text>
              </svg>
            </div>

            {/* X-Axis Months Timeline in Accent Orange */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingLeft: '42px',
                marginTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                paddingTop: '12px',
              }}
            >
              {months.map((m) => {
                const isHighlight = m === 'APR' || m === 'MAY' || m === 'JUN';
                return (
                  <span
                    key={m}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: isHighlight ? 800 : 600,
                      color: isHighlight ? '#ffffff' : '#cbd5e1',
                      background: isHighlight ? '#f97316' : 'transparent',
                      padding: isHighlight ? '3px 8px' : '3px 0',
                      borderRadius: '4px',
                      boxShadow: isHighlight ? '0 2px 8px rgba(249, 115, 22, 0.5)' : 'none',
                    }}
                  >
                    {m}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
