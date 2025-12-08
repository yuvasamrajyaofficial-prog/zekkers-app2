
import React from 'react';
import { Landmark, Briefcase, Globe, BrainCircuit, Building, BookOpen, MessageCircle, Code, GraduationCap, Shield } from 'lucide-react';
import { locations } from './locations';

const indianStates = locations.find(l => l.name === 'India')?.states.map(s => s.name) || [];

const stateExamsSubcategories = indianStates.map(state => ({
    title: state,
    exams: [
        `${state.split(' ').map(w => w[0]).join('')}PSC`,
        `${state.split(' ').map(w => w[0]).join('')} Police`,
        `${state.split(' ').map(w => w[0]).join('')} TET`,
        'Revenue Dept.',
        'Transport Dept.',
    ]
}));


export const studyCategories = [
  {
    slug: 'government-exams',
    icon: React.createElement(Landmark, { className: 'w-8 h-8' }),
    title: 'Government Exams',
    description: 'Comprehensive material for SSC, Banking, Railways, UPSC, and State-level exams.',
    color: '#3740FF',
    subcategories: [
        { title: 'SSC', exams: ['CGL', 'CHSL', 'MTS'] },
        { title: 'Railways', exams: ['RRB NTPC', 'Group D'] },
        { title: 'Banking', exams: ['SBI PO', 'IBPS PO', 'Clerk'] },
        { title: 'UPSC Prelims', exams: ['IAS', 'IFS'] },
        { title: 'PSU Recruitment', exams: ['NTPC', 'BHEL'] },
        { title: 'EPFO, ESIC', exams: [] },
        { title: 'Defense', exams: ['Navy', 'Air Force', 'Army'] },
        { title: 'Teaching', exams: ['TET', 'CTET'] },
    ]
  },
  {
    slug: 'state-govt-exams',
    icon: React.createElement(Building, { className: 'w-8 h-8' }),
    title: 'State Govt Exams',
    description: 'Prepare for state-specific public service commissions, police, and teacher eligibility tests.',
    color: '#16A34A',
    subcategories: stateExamsSubcategories
  },
   {
    slug: 'department-exams',
    icon: React.createElement(Shield, { className: 'w-8 h-8' }),
    title: 'Department Exams',
    description: 'Targeted preparation for specific government departments like Police, Revenue, and Transport.',
    color: '#F97316',
    subcategories: [
        { title: 'Police', exams: [] },
        { title: 'Revenue', exams: [] },
        { title: 'Transport', exams: [] },
        { title: 'Forest', exams: [] },
        { title: 'Electricity Board', exams: [] },
        { title: 'Panchayat & Municipal', exams: [] },
        { title: 'Agriculture Dept', exams: [] },
        { title: 'Health Dept', exams: [] },
    ]
  },
  {
    slug: 'private-job-skills',
    icon: React.createElement(Briefcase, { className: 'w-8 h-8' }),
    title: 'Private Job Skills',
    description: 'Master in-demand skills for IT, Sales, Marketing, HR, and corporate roles.',
    color: '#06B6D4',
    subcategories: [
        { title: 'IT Development', exams: ['Frontend', 'Backend', 'Mobile'] },
        { title: 'DevOps & Cloud', exams: [] },
        { title: 'QA Testing', exams: [] },
        { title: 'Data Analytics', exams: [] },
        { title: 'Cyber Security', exams: [] },
        { title: 'Digital Marketing', exams: [] },
        { title: 'Sales & BPO', exams: [] },
        { title: 'Excel/Power BI', exams: [] },
    ]
  },
  {
    slug: 'global-job-skills',
    icon: React.createElement(Globe, { className: 'w-8 h-8' }),
    title: 'Global Job Skills',
    description: 'Prepare for international careers with courses on hospitality, healthcare, and language proficiency.',
    color: '#8B5CF6',
    subcategories: [
        { title: 'Gulf Job Skills', exams: [] },
        { title: 'Europe/US IT Skills', exams: [] },
        { title: 'Nursing / Healthcare', exams: [] },
        { title: 'Hospitality / Tourism', exams: [] },
        { title: 'Construction / Electrical / HVAC', exams: [] },
        { title: 'Retail & Customer Care', exams: [] },
        { title: 'Global Languages', exams: ['IELTS', 'TOEFL'] },
    ]
  },
  {
    slug: 'competitive-exams',
    icon: React.createElement(GraduationCap, { className: 'w-8 h-8' }),
    title: 'Competitive Exams',
    description: 'Ace entrance exams like JEE, NEET, CAT, and GATE with targeted study content and mock tests.',
    color: '#F59E0B',
    subcategories: [
        { title: 'Engineering', exams: ['JEE Main', 'JEE Advanced'] },
        { title: 'Medical', exams: ['NEET'] },
        { title: 'MBA', exams: ['CAT', 'MAT'] },
        { title: 'Post-Graduation', exams: ['GATE'] },
    ]
  },
  {
    slug: 'aptitude-and-reasoning',
    icon: React.createElement(BrainCircuit, { className: 'w-8 h-8' }),
    title: 'Aptitude & Reasoning',
    description: 'Sharpen your quantitative, logical, and analytical skills for any competitive test.',
    color: '#EF4444',
    subcategories: []
  },
  {
    slug: 'language-and-communication',
    icon: React.createElement(MessageCircle, { className: 'w-8 h-8' }),
    title: 'Language & Communication',
    description: 'Improve your English, Hindi, and regional language proficiency for exams and interviews.',
    color: '#EC4899',
    subcategories: []
  },
   {
    slug: 'technical-and-it-skills',
    icon: React.createElement(Code, { className: 'w-8 h-8' }),
    title: 'Technical & IT Skills',
    description: 'Deep dive into DSA, web development, cloud computing, and other core tech domains.',
    color: '#6366F1',
    subcategories: []
  },
];
