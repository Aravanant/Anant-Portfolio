import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const adminPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'anant@2025';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 10
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// Admin Security Passcode Helpers
// ==========================================
export const verifyAdminPasscode = (inputCode) => {
  if (!inputCode) return false;
  if (inputCode.trim() === adminPasscode.trim()) {
    try {
      sessionStorage.setItem('anant_portfolio_admin_auth', 'true');
    } catch (e) {
      console.error(e);
    }
    return true;
  }
  return false;
};

export const isAdminAuthenticated = () => {
  try {
    return sessionStorage.getItem('anant_portfolio_admin_auth') === 'true';
  } catch (e) {
    return false;
  }
};

export const logoutAdmin = () => {
  try {
    sessionStorage.removeItem('anant_portfolio_admin_auth');
  } catch (e) {
    console.error(e);
  }
};

// ==========================================
// Data Mappers
// ==========================================
export const mapExperienceFromDb = (row) => ({
  id: row.id,
  role: row.role || '',
  company: row.company || '',
  type: row.type || 'Internship',
  duration: row.duration || '',
  location: row.location || '',
  responsibilities: Array.isArray(row.responsibilities)
    ? row.responsibilities
    : (typeof row.responsibilities === 'string' ? JSON.parse(row.responsibilities || '[]') : []),
  skillsUsed: Array.isArray(row.skills_used)
    ? row.skills_used
    : (Array.isArray(row.skillsUsed) ? row.skillsUsed : []),
  document: row.document || '',
  referenceId: row.reference_id || row.referenceId || '',
  verificationUrl: row.verification_url || row.verificationUrl || '',
  status: row.status || 'Verified',
  createdAt: row.created_at || new Date().toISOString()
});

export const mapProjectFromDb = (row) => ({
  id: row.id,
  title: row.title || '',
  category: row.category || 'Python & SQL',
  domain: row.domain || 'Data Analytics & Business Intelligence',
  summary: row.summary || '',
  stack: Array.isArray(row.stack) ? row.stack : [],
  metrics: Array.isArray(row.metrics) ? row.metrics : [],
  thumbnail: row.thumbnail || '',
  githubLink: row.github_link || row.githubLink || '',
  demoLink: row.demo_link || row.demoLink || '',
  createdAt: row.created_at
    ? new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : (row.createdAt || '')
});

export const mapCertificateFromDb = (row) => ({
  id: row.id,
  title: row.title || '',
  issuer: row.issuer || '',
  credentialId: row.credential_id || row.credentialId || '',
  issueDate: row.issue_date || row.issueDate || '',
  verificationUrl: row.verification_url || row.verificationUrl || '',
  skillsCovered: Array.isArray(row.skills_covered)
    ? row.skills_covered
    : (Array.isArray(row.skillsCovered) ? row.skillsCovered : []),
  image: row.image || '',
  status: row.status || 'Verified',
  createdAt: row.created_at || new Date().toISOString()
});

// ==========================================
// Experience Service
// ==========================================
export const fetchExperiencesService = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch experiences error, falling back to local:', error);
      } else if (data) {
        const mapped = data.map(mapExperienceFromDb);
        try {
          localStorage.setItem('anant_portfolio_experience', JSON.stringify(mapped));
        } catch (e) {}
        return mapped;
      }
    } catch (err) {
      console.warn('Supabase experiences exception:', err);
    }
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem('anant_portfolio_experience');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

export const saveExperienceService = async (exp) => {
  // Always update local cache immediately
  try {
    const current = JSON.parse(localStorage.getItem('anant_portfolio_experience') || '[]');
    const updated = [exp, ...current.filter((item) => item.id !== exp.id)];
    localStorage.setItem('anant_portfolio_experience', JSON.stringify(updated));
  } catch (e) {}

  if (supabase) {
    const payload = {
      id: exp.id,
      role: exp.role,
      company: exp.company,
      type: exp.type || 'Internship',
      duration: exp.duration,
      location: exp.location,
      responsibilities: exp.responsibilities || [],
      skills_used: exp.skillsUsed || [],
      document: exp.document || '',
      reference_id: exp.referenceId || '',
      verification_url: exp.verificationUrl || '',
      status: exp.status || 'Verified'
    };

    const { error } = await supabase.from('experiences').upsert([payload]);
    if (error) {
      console.error('Supabase save experience failed:', error);
      throw error;
    }
  }
  return exp;
};

export const deleteExperienceService = async (id) => {
  try {
    const current = JSON.parse(localStorage.getItem('anant_portfolio_experience') || '[]');
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem('anant_portfolio_experience', JSON.stringify(updated));
  } catch (e) {}

  if (supabase) {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete experience failed:', error);
      throw error;
    }
  }
};

// ==========================================
// Project Service
// ==========================================
export const fetchProjectsService = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch projects error, falling back to local:', error);
      } else if (data) {
        const mapped = data.map(mapProjectFromDb);
        try {
          localStorage.setItem('anant_portfolio_projects', JSON.stringify(mapped));
        } catch (e) {}
        return mapped;
      }
    } catch (err) {
      console.warn('Supabase projects exception:', err);
    }
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem('anant_portfolio_projects');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    const dummyIds = ['churn', 'sales-bi', 'supply-chain', 'hr-attrition'];
    return Array.isArray(parsed) ? parsed.filter((p) => !dummyIds.includes(p.id)) : [];
  } catch (e) {
    return [];
  }
};

export const saveProjectService = async (proj) => {
  try {
    const current = JSON.parse(localStorage.getItem('anant_portfolio_projects') || '[]');
    const updated = [proj, ...current.filter((item) => item.id !== proj.id)];
    localStorage.setItem('anant_portfolio_projects', JSON.stringify(updated));
  } catch (e) {}

  if (supabase) {
    const payload = {
      id: proj.id,
      title: proj.title,
      category: proj.category || 'Python & SQL',
      domain: proj.domain || 'Data Analytics & Business Intelligence',
      summary: proj.summary || '',
      stack: proj.stack || [],
      metrics: proj.metrics || [],
      thumbnail: proj.thumbnail || '',
      github_link: proj.githubLink || '',
      demo_link: proj.demoLink || ''
    };

    const { error } = await supabase.from('projects').upsert([payload]);
    if (error) {
      console.error('Supabase save project failed:', error);
      throw error;
    }
  }
  return proj;
};

export const deleteProjectService = async (id) => {
  try {
    const current = JSON.parse(localStorage.getItem('anant_portfolio_projects') || '[]');
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem('anant_portfolio_projects', JSON.stringify(updated));
  } catch (e) {}

  if (supabase) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete project failed:', error);
      throw error;
    }
  }
};

// ==========================================
// Certificate Service
// ==========================================
export const fetchCertificatesService = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch certificates error, falling back to local:', error);
      } else if (data) {
        const mapped = data.map(mapCertificateFromDb);
        try {
          localStorage.setItem('anant_portfolio_certificates', JSON.stringify(mapped));
        } catch (e) {}
        return mapped;
      }
    } catch (err) {
      console.warn('Supabase certificates exception:', err);
    }
  }

  // Fallback to localStorage
  try {
    const saved = localStorage.getItem('anant_portfolio_certificates');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return parsed.filter(
      (c) =>
        !['cert-1', 'cert-2', 'cert-3'].includes(c.id) &&
        !c.title?.includes('Google Data Analytics') &&
        !c.title?.includes('Microsoft Certified: Power BI') &&
        !c.title?.includes('SQL (Advanced) Skills Assessment')
    );
  } catch (e) {
    return [];
  }
};

export const saveCertificateService = async (cert) => {
  try {
    const current = JSON.parse(localStorage.getItem('anant_portfolio_certificates') || '[]');
    const updated = [cert, ...current.filter((item) => item.id !== cert.id)];
    localStorage.setItem('anant_portfolio_certificates', JSON.stringify(updated));
  } catch (e) {}

  if (supabase) {
    const payload = {
      id: cert.id,
      title: cert.title,
      issuer: cert.issuer || 'Verified Issuer',
      credential_id: cert.credentialId || '',
      issue_date: cert.issueDate || '',
      verification_url: cert.verificationUrl || '',
      skills_covered: cert.skillsCovered || [],
      image: cert.image || '',
      status: cert.status || 'Verified'
    };

    const { error } = await supabase.from('certificates').upsert([payload]);
    if (error) {
      console.error('Supabase save certificate failed:', error);
      throw error;
    }
  }
  return cert;
};

export const deleteCertificateService = async (id) => {
  try {
    const current = JSON.parse(localStorage.getItem('anant_portfolio_certificates') || '[]');
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem('anant_portfolio_certificates', JSON.stringify(updated));
  } catch (e) {}

  if (supabase) {
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete certificate failed:', error);
      throw error;
    }
  }
};
