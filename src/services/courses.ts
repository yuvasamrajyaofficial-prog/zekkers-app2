// Zekkers - Courses Service

// ------------------------------- Types --------------------------------
export type CourseType = 'academic'|'training'|'govt'|'global'|'it';
export type CourseMode = 'online'|'offline'|'hybrid';

export interface Course {
  id: string;
  title: string;
  description?: string;
  category?: CourseType;
  department?: string;
  mode?: CourseMode;
  startDate?: string; // ISO
  endDate?: string;
  trainer?: string;
  skills?: string[];
  seats?: number;
  enrolled?: number;
  progressPercent?: number;
  language?: string;
  published?: boolean;
  createdAt?: string;
}

// ------------------------------- Mock Seed & Storage -------------------------------
const COURSES_KEY = 'zk:courses:mock';

function getMockCourses(): Course[] {
    if (typeof window === 'undefined') {
        return [];
    }
    const stored = localStorage.getItem(COURSES_KEY);
    if(stored) {
        return JSON.parse(stored) as Course[];
    }
    
    const arr: Course[] = [
      { id:'c-1', title:'Aptitude Mastery', description: 'Master quantitative aptitude, logical reasoning, and verbal ability for all major competitive exams.', category:'training', mode:'online', startDate:'2025-01-10', endDate:'2025-02-10', trainer:'Dr. Asha Sharma', skills:['Aptitude','Quant'], seats:100, enrolled:58, progressPercent: 42, language:'en', published:true, createdAt: new Date().toISOString() },
      { id:'c-2', title:'Full Stack Bootcamp', description: 'A comprehensive bootcamp covering MERN stack, DevOps, and system design principles.', category:'it', mode:'hybrid', startDate:'2025-03-01', endDate:'2025-06-01', trainer:'Mr. Raj Kumar', skills:['React','Node','SQL', 'MongoDB'], seats:40, enrolled:34, progressPercent: 64, language:'en', published:true, createdAt: new Date().toISOString() },
      { id:'c-3', title:'SSC Complete Batch 2025', description: 'An intensive offline program for SSC CGL, CHSL, and MTS exams with expert faculty.', category:'govt', mode:'offline', startDate:'2025-02-01', endDate:'2025-05-01', trainer:'Zekkers Exam Cell', skills:['General Awareness','Quant'], seats:200, enrolled:120, progressPercent: 30, language:'hi', published:true, createdAt: new Date().toISOString() }
    ];
    localStorage.setItem(COURSES_KEY, JSON.stringify(arr));
    return arr;
}

function writeMockCourses(arr: Course[]){ 
    if (typeof window !== 'undefined') {
        localStorage.setItem(COURSES_KEY, JSON.stringify(arr)); 
    }
}

// ------------------------------- Services (Firestore-safe) -------------------------------
export const CoursesService = {
  async list(collegeId?: string): Promise<Course[]>{
    // This service uses a mock fallback for demo purposes.
    // In a production environment, you would replace this with a Firestore query.
    return Promise.resolve(getMockCourses());
  },
  async create(collegeId: string|undefined, payload: Partial<Course>): Promise<Course>{
    const arr = getMockCourses(); 
    const id = 'c-'+(Date.now()%100000); 
    const obj:Course = { 
        id, 
        title: payload.title||'Untitled', 
        description: payload.description||'', 
        category: payload.category||'training', 
        mode: payload.mode||'online', 
        startDate: payload.startDate, 
        endDate: payload.endDate, 
        trainer: payload.trainer, 
        skills: payload.skills||[], 
        seats: payload.seats||0, 
        enrolled: payload.enrolled||0, 
        progressPercent: payload.progressPercent||0, 
        language: payload.language||'en', 
        published: payload.published||false, 
        createdAt: new Date().toISOString() 
    }; 
    arr.unshift(obj); 
    writeMockCourses(arr); 
    return Promise.resolve(obj); 
  },
  async update(collegeId: string|undefined, id: string, patch: Partial<Course>): Promise<Course>{
    const arr = getMockCourses(); 
    const idx = arr.findIndex(c=> c.id===id); 
    if(idx>=0){ 
        arr[idx] = { ...arr[idx], ...patch }; 
        writeMockCourses(arr); 
        return Promise.resolve(arr[idx]); 
    } 
    throw new Error('Course not-found'); 
  },
  async get(collegeId: string|undefined, id: string): Promise<Course | undefined>{
    return Promise.resolve(getMockCourses().find(c=> c.id===id)); 
  }
};
