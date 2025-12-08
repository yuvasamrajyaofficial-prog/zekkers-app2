
'use client';
import { v4 as uuidv4 } from 'uuid';

// --------------------------- Types ---------------------------
export type QuestionType = 'mcq'|'multi'|'numeric'|'short'|'long'|'coding'|'file'|'audio';

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  choices?: string[]; // for MCQ / multi
  answer?: any; // canonical answer or rubric
  marks?: number;
  negativeMarks?: number;
  timeLimitSec?: number;
  tags?: string[];
  testcases?: { input: string; output: string; hidden?: boolean }[]; // for coding
}

export interface Assessment {
  id: string;
  title: string;
  description?: string;
  durationMin?: number;
  sections?: { id:string; title:string; shuffleQuestions?: boolean; timeMin?: number; questionIds: string[] }[];
  questions: Question[];
  createdAt?: string;
  published?: boolean;
}

export interface AttemptSummary {
  id: string;
  assessmentId: string;
  candidateId: string;
  startedAt?: string;
  submittedAt?: string | null;
  answers: Record<string, any>;
  autoScore?: number;
  flags?: string[];
}

// --------------------------- Mock Storage ---------------------------
const ASSESS_KEY = 'zk:assess:mock';
const ATTEMPT_KEY = 'zk:assess:attempts:mock';

function seedMockAssessments(){
  if(typeof window !== 'undefined' && !localStorage.getItem(ASSESS_KEY)){
    const q1: Question = { id: 'q-1', type: 'mcq', title: 'What is 2+2?', choices: ['3','4','5','6'], answer: 1, marks: 2 };
    const q2: Question = { id: 'q-2', type: 'numeric', title: 'Value of pi (2 dp)', answer: 3.14, marks: 3 };
    const q3: Question = { id: 'q-3', type: 'coding', title: 'Sum two numbers', testcases: [{ input:'1 2', output:'3' }, { input:'10 20', output:'30', hidden:true }], marks:10 };
    const a: Assessment[] = [{ id:'a-1', title: 'Sample Aptitude Test', description: 'Demo assessment', durationMin: 30, sections: [{ id:'s-1', title:'Section 1', questionIds:['q-1','q-2','q-3'] }], questions: [q1,q2,q3], createdAt: new Date().toISOString(), published:true }];
    localStorage.setItem(ASSESS_KEY, JSON.stringify(a));
    localStorage.setItem(ATTEMPT_KEY, JSON.stringify([]));
  }
}
seedMockAssessments();

function readMockAssessments(): Assessment[]{ if (typeof window === 'undefined') return []; return JSON.parse(localStorage.getItem(ASSESS_KEY) || '[]') as Assessment[]; }
function writeMockAssessments(arr: Assessment[]){ if (typeof window !== 'undefined') localStorage.setItem(ASSESS_KEY, JSON.stringify(arr)); }
function readMockAttempts(): AttemptSummary[]{ if (typeof window === 'undefined') return []; return JSON.parse(localStorage.getItem(ATTEMPT_KEY) || '[]') as AttemptSummary[]; }
function writeMockAttempts(arr: AttemptSummary[]){ if (typeof window !== 'undefined') localStorage.setItem(ATTEMPT_KEY, JSON.stringify(arr)); }

// --------------------------- Services ---------------------------
export const AssessmentService = {
  async list(collegeId?: string): Promise<Assessment[]>{
    // TODO: Replace with Firestore reads in production
    await new Promise(resolve => setTimeout(resolve, 500)); // simulate network delay
    return readMockAssessments();
  },
  async create(collegeId: string|undefined, payload: Partial<Assessment>){
    const arr = readMockAssessments(); 
    const id = payload.id || uuidv4(); 
    const obj:Assessment = { id, title: payload.title||'Untitled Assessment', description: payload.description||'', durationMin: payload.durationMin||30, sections: payload.sections || [], questions: payload.questions || [], createdAt: new Date().toISOString(), published: payload.published||false }; 
    arr.unshift(obj); 
    writeMockAssessments(arr); 
    return obj;
  },
  async update(collegeId: string|undefined, id: string, patch: Partial<Assessment>){
    const arr = readMockAssessments(); 
    const idx = arr.findIndex(a=> a.id===id); 
    if(idx>=0){ 
        arr[idx] = { ...arr[idx], ...patch }; 
        writeMockAssessments(arr); 
        return arr[idx]; 
    } 
    throw new Error('Assessment not found'); 
  },
  async get(collegeId: string|undefined, id: string){
    return readMockAssessments().find(a=> a.id===id);
  },
  // Attempts
  async createAttempt(collegeId: string|undefined, attempt: AttemptSummary){
    const arr = readMockAttempts(); 
    arr.push(attempt); 
    writeMockAttempts(arr); 
    return attempt;
  },
  async updateAttempt(collegeId:string|undefined, attemptId: string, patch: Partial<AttemptSummary>){
    const arr = readMockAttempts(); 
    const idx = arr.findIndex(a=> a.id===attemptId); 
    if(idx>=0){ 
        arr[idx] = { ...arr[idx], ...patch }; 
        writeMockAttempts(arr); 
        return arr[idx]; 
    } 
    throw new Error('Attempt not found');
  },
  async listAttempts(collegeId?:string, assessmentId?:string){
    const arr = readMockAttempts(); 
    return assessmentId ? arr.filter(a=> a.assessmentId===assessmentId) : arr;
  }
};
