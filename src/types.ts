export type AppPage = 'home' | 'stats' | 'work' | 'certificates' | 'experience' | 'about' | 'photography' | 'archive';

export interface CertificateItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  issuerOrg: string;
  issueDate: string;
  credentialId: string;
  category: 'ux' | 'enterprise' | 'architecture' | 'leadership';
  status: 'Verified' | 'Active';
  summary: string;
  skills: string[];
  verificationUrl?: string;
  score?: string;
  credentialBadge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  year: string;
  tag: 'case-study' | 'web-design' | 'app-design';
  image: string;
  ratio: number;
  cover: string;
  size: 'lg' | 'sm';
  href?: string;
  summary?: string;
  details?: {
    overview: string;
    role: string;
    period: string;
    deliverables: string[];
    highlights: string[];
  };
}

export interface ExperienceItem {
  key: string;
  index: string;
  name: string;
  role: string;
  period?: string;
  location?: string;
  description: string;
  skills?: string[];
}

export interface StatItem {
  box: string;
  label: string;
  value: string;
}

export interface ToolItem {
  box: string;
  logo: string;
  alt: string;
  label: string;
}

export interface SocialGroup {
  label: string;
  links: {
    label: string;
    href: string;
  }[];
}
