import React from 'react';

export const LogoIcon = ({ size = 24, color = '#f97316' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const DownloadIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const MoonIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const SunIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export const ArrowRightIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const MailIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
  </svg>
);

export const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const UserIcon = ({ size = 20, color = '#f97316' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const CodeIcon = ({ size = 20, color = '#f97316' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const BriefcaseIcon = ({ size = 20, color = '#f97316' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const HtmlIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#e34f26">
    <path d="M1.5 0h21l-1.91 21.488L11.99 24l-8.59-2.512L1.5 0zm16.57 6.1H5.93l.36 4.09h9.86l-.41 4.67-3.75 1.04-3.75-1.04-.24-2.73H5.97l.47 5.37 5.55 1.54 5.55-1.54 1.03-11.46z"/>
  </svg>
);

export const CssIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1572b6">
    <path d="M1.5 0h21l-1.91 21.488L11.99 24l-8.59-2.512L1.5 0zm16.4 6.1H6.1l.36 4.09h9.69l-.41 4.67-3.75 1.04-3.75-1.04-.24-2.73H6.14l.47 5.37 5.38 1.54 5.38-1.54.9-10.46.13-1.4z"/>
  </svg>
);

export const JsIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f7df1e">
    <rect width="24" height="24" rx="3" fill="#f7df1e" />
    <path d="M7.8 17.5c.6.9 1.4 1.5 2.6 1.5 1.3 0 2.1-.7 2.1-2.4v-8.2h-2.1v8.2c0 .6-.3.9-.8.9-.5 0-.8-.3-1.1-.7l-.7.7zm8.3-5.2c-.7-.5-1.4-.9-2.2-1.3-.5-.3-.9-.6-.9-1.1 0-.5.4-.8 1-.8.7 0 1.2.3 1.6.8l1.3-1.2c-.8-.9-1.8-1.4-2.9-1.4-1.9 0-3.1 1.2-3.1 2.8 0 1.2.7 2 2.1 2.6.8.4 1.5.8 1.5 1.4 0 .6-.5 1-1.3 1-.9 0-1.6-.4-2.2-1.1l-1.4 1.2c1 1.3 2.1 1.8 3.6 1.8 2.2 0 3.4-1.2 3.4-3 0-1.4-.8-2.2-2.1-2.8z" fill="#000000" />
  </svg>
);

export const ReactIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.5">
    <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" />
    <circle cx="12" cy="12" r="2" fill="#61dafb" />
  </svg>
);

export const NodeIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#68a063">
    <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z" />
  </svg>
);

export const MouseScrollIcon = ({ size = 28 }) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 24 38" fill="none" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="34" rx="10" />
    <line x1="12" y1="8" x2="12" y2="15" className="animate-bounce" />
  </svg>
);

export const SqlIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

export const PythonIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#38bdf8">
    <path d="M11.91 2c-5.07 0-4.75 2.2-4.75 2.2l.01 2.28h4.82v.69H5.19S2 6.8 2 11.93c0 5.12 2.78 4.93 2.78 4.93h1.66v-2.33s-.09-2.78 2.74-2.78h4.69v-.71H8.76s-2.07.13-2.07-2.02c0-2.14 1.88-2.16 1.88-2.16h7.97s2.59.39 2.59-4.04C19.13 2 11.91 2 11.91 2zM9.54 3.44a.79.79 0 1 1 0 1.58.79.79 0 0 1 0-1.58zm2.55 18.56c5.07 0 4.75-2.2 4.75-2.2l-.01-2.28H12v-.69h6.81s3.19.37 3.19-4.76c0-5.12-2.78-4.93-2.78-4.93h-1.66v2.33s.09 2.78-2.74 2.78h-4.69v.71h5.11s2.07-.13 2.07 2.02c0 2.14-1.88 2.16-1.88 2.16H8.84s-2.59-.39-2.59 4.04c0 .82.74 1.82 2.73 1.82h3.11zm2.37-1.44a.79.79 0 1 1 0-1.58.79.79 0 0 1 0 1.58z" fill="#f59e0b"/>
  </svg>
);

export const PowerBiIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b">
    <rect x="3" y="11" width="4.5" height="10" rx="1.5" fill="#f59e0b" opacity="0.75" />
    <rect x="9.5" y="6" width="4.5" height="15" rx="1.5" fill="#f59e0b" opacity="0.9" />
    <rect x="16" y="2" width="4.5" height="19" rx="1.5" fill="#f59e0b" />
  </svg>
);

export const TableauIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#ea580c">
    <rect x="11" y="2" width="2" height="6" rx="1" fill="#ea580c"/>
    <rect x="9" y="4" width="6" height="2" rx="1" fill="#ea580c"/>
    <rect x="11" y="16" width="2" height="6" rx="1" fill="#ea580c"/>
    <rect x="9" y="18" width="6" height="2" rx="1" fill="#ea580c"/>
    <rect x="2" y="11" width="6" height="2" rx="1" fill="#ea580c"/>
    <rect x="4" y="9" width="2" height="6" rx="1" fill="#ea580c"/>
    <rect x="16" y="11" width="6" height="2" rx="1" fill="#ea580c"/>
    <rect x="18" y="9" width="2" height="6" rx="1" fill="#ea580c"/>
    <circle cx="12" cy="12" r="2.5" fill="#f97316"/>
  </svg>
);

export const ExcelIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#107c41">
    <path d="M21 3H9a2 2 0 0 0-2 2v2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 5h12v14H9v-2h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H9V5zm-4 4h4v6H5V9z" />
    <path d="M6 10.5l2 3M8 10.5l-2 3" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const AwardIcon = ({ size = 22, color = '#f97316' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

export const ExternalLinkIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const CheckCircleIcon = ({ size = 16, color = '#22c55e' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const PlusIcon = ({ size = 20, color = '#f97316' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const TrashIcon = ({ size = 15, color = '#ef4444' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export const BuildingIcon = ({ size = 18, color = '#f97316' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

export const CalendarIcon = ({ size = 16, color = '#94a3b8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const MapPinIcon = ({ size = 16, color = '#94a3b8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const FileTextIcon = ({ size = 16, color = '#f97316' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

