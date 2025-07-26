// Project Data Interface
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'ai' | 'web' | 'tool';
}

// Technology Stack Interface
export interface TechSkill {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'cloud';
  level: number; // 1-100
  icon: string;
  description?: string;
}

// AI Tool Interface
export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  rating: number;
  features: string[];
  liveUrl?: string;
}

// Service Interface
export interface AIService {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  pricing?: string;
}

// Learning Journey Interface
export interface LearningMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  technologies: string[];
  type: 'project' | 'learning' | 'achievement';
}

// Navigation Item Interface
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

// Statistics Interface
export interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}