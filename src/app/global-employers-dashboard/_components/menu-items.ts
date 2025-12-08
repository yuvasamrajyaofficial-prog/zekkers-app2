
import {
  LayoutGrid,
  Briefcase,
  Users,
  BarChart2,
  MessageSquare,
  Settings,
  CreditCard,
  Building,
  Plug,
  ShieldCheck,
  Handshake,
  Globe,
  LifeBuoy,
  Kanban,
  Sparkles,
  Bell,
  Wrench,
  KanbanSquare,
} from 'lucide-react';
import React from 'react';

export const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    to: '/global-employers-dashboard',
    icon: React.createElement(LayoutGrid, { size: 20 }),
    subItems: [
      { key: 'overview', label: 'Overview', to: '/global-employers-dashboard' },
      { key: 'talent-insights', label: 'Global Talent Insights', to: '/global-employers-dashboard/talent-insights' },
      { key: 'country-analytics', label: 'Country Analytics', to: '/global-employers-dashboard/country-analytics' },
    ],
  },
  {
    key: 'jobs',
    label: 'Jobs',
    to: '/global-employers-dashboard/jobs',
    icon: React.createElement(Briefcase, { size: 20 }),
    subItems: [
      { key: 'post-global', label: 'Post Global Job', to: '/global-employers-dashboard/jobs/create' },
      { key: 'manage', label: 'Manage Jobs', to: '/global-employers-dashboard/jobs' },
      { key: 'drafts', label: 'Drafts', to: '/global-employers-dashboard/jobs/drafts' },
      { key: 'ai-generator', label: 'AI JD Generator', to: '/global-employers-dashboard/jobs/ai-generator' },
    ],
  },
  {
    key: 'candidates',
    label: 'Candidates',
    to: '/global-employers-dashboard/candidates',
    icon: React.createElement(Users, { size: 20 }),
    subItems: [
      { key: 'all', label: 'All Candidates', to: '/global-employers-dashboard/candidates' },
      { key: 'ai-finder', label: 'AI Candidate Finder', to: '/global-employers-dashboard/candidates/ai-finder' },
      { key: 'shortlisted', label: 'Shortlisted', to: '/global-employers-dashboard/candidates/shortlisted' },
      { key: 'saved', label: 'Saved', to: '/global-employers-dashboard/candidates/saved' },
      { key: 'recommended', label: 'Recommended by AI', to: '/global-employers-dashboard/candidates/recommended' },
    ],
  },
  {
    key: 'ats',
    label: 'ATS',
    to: '/global-employers-dashboard/ats',
    icon: React.createElement(KanbanSquare, { size: 20 }),
    subItems: [
      { key: 'pipeline', label: 'Pipeline', to: '/global-employers-dashboard/ats/pipeline' },
      { key: 'scheduler', label: 'Interview Scheduler', to: '/global-employers-dashboard/ats/scheduler' },
      { key: 'assignments', label: 'Assignments', to: '/global-employers-dashboard/ats/assignments' },
      { key: 'offers', label: 'Offer Management', to: '/global-employers-dashboard/ats/offers' },
      { key: 'onboarding', label: 'Onboarding', to: '/global-employers-dashboard/ats/onboarding' },
    ],
  },
  {
    key: 'messages',
    label: 'Messages',
    to: '/global-employers-dashboard/messages',
    icon: React.createElement(MessageSquare, { size: 20 }),
  },
  {
    key: 'hiring-tools',
    label: 'Hiring Tools',
    to: '/global-employers-dashboard/tools',
    icon: React.createElement(Wrench, { size: 20 }),
    subItems: [
      { key: 'assessments', label: 'Assessment Center', to: '/global-employers-dashboard/tools/assessments' },
      { key: 'salary-benchmarking', label: 'Global Salary Benchmarking', to: '/global-employers-dashboard/tools/salary' },
      { key: 'skill-gap', label: 'Skill Gap Analyzer', to: '/global-employers-dashboard/tools/skill-gap' },
      { key: 'background-verification', label: 'Background Verification', to: '/global-employers-dashboard/tools/background-verification' },
      { key: 'cultural-fit', label: 'Cultural Fit Analyzer (AI)', to: '/global-employers-dashboard/tools/cultural-fit' },
      { key: 'language-evaluator', label: 'Language Proficiency Evaluator', to: '/global-employers-dashboard/tools/language' },
    ],
  },
  {
    key: 'organization',
    label: 'Organization',
    to: '/global-employers-dashboard/organization',
    icon: React.createElement(Building, { size: 20 }),
    subItems: [
      { key: 'profile', label: 'Company Profile', to: '/global-employers-dashboard/organization/profile' },
      { key: 'kyc', label: 'KYC & Global Compliance', to: '/global-employers-dashboard/organization/kyc' },
      { key: 'team', label: 'Team & Permissions', to: '/global-employers-dashboard/organization/team' },
      { key: 'branding', label: 'Employer Branding', to: '/global-employers-dashboard/organization/branding' },
      { key: 'locations', label: 'Offices & Locations', to: '/global-employers-dashboard/organization/locations' },
      { key: 'recruiters', label: 'Multi-country Recruiters', to: '/global-employers-dashboard/organization/recruiters' },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    to: '/global-employers-dashboard/finance',
    icon: React.createElement(CreditCard, { size: 20 }),
    subItems: [
        { key: 'billing', label: 'Billing & Plans', to: '/global-employers-dashboard/finance/billing' },
        { key: 'invoices', label: 'Invoices', to: '/global-employers-dashboard/finance/invoices' },
        { key: 'credits', label: 'Credit Usage', to: '/global-employers-dashboard/finance/credits' },
        { key: 'payment-methods', label: 'Payment Methods', to: '/global-employers-dashboard/finance/payment-methods' },
    ]
  },
  {
    key: 'integrations',
    label: 'Integrations',
    to: '/global-employers-dashboard/integrations',
    icon: React.createElement(Plug, { size: 20 }),
    subItems: [
        { key: 'ats', label: 'ATS Integrations', to: '/global-employers-dashboard/integrations/ats' },
        { key: 'hrms', label: 'HRMS Sync', to: '/global-employers-dashboard/integrations/hrms' },
        { key: 'chat', label: 'Slack/Teams', to: '/global-employers-dashboard/integrations/chat' },
        { key: 'calendar', label: 'Calendar Sync', to: '/global-employers-dashboard/integrations/calendar' },
        { key: 'assessments', label: 'Assessment Providers', to: '/global-employers-dashboard/integrations/assessments' },
        { key: 'bgv', label: 'Background Check Providers', to: '/global-employers-dashboard/integrations/bgv' },
    ]
  },
  {
    key: 'support',
    label: 'Support',
    to: '/global-employers-dashboard/support',
    icon: React.createElement(LifeBuoy, { size: 20 }),
    subItems: [
        { key: 'help-center', label: 'Help Center', to: '/global-employers-dashboard/support/help' },
        { key: 'raise-ticket', label: 'Raise a Ticket', to: '/global-employers-dashboard/support/ticket' },
        { key: 'tutorials', label: 'Tutorials', to: '/global-employers-dashboard/support/tutorials' },
        { key: 'api-docs', label: 'API Documentation', to: '/global-employers-dashboard/support/api' },
    ]
  },
  {
    key: 'settings',
    label: 'Settings',
    to: '/global-employers-dashboard/settings',
    icon: React.createElement(Settings, { size: 20 }),
     subItems: [
        { key: 'account', label: 'Account Settings', to: '/global-employers-dashboard/settings' },
        { key: 'notifications', label: 'Notification Settings', to: '/global-employers-dashboard/settings/notifications' },
        { key: 'security', label: 'Security & Login', to: '/global-employers-dashboard/settings/security' },
        { key: 'data', label: 'Data Export / Delete', to: '/global-employers-dashboard/settings/data' },
        { key: 'api-keys', label: 'API Keys', to: '/global-employers-dashboard/settings/api-keys' },
    ]
  },
];
