
export type QuestionType = 'mcq' | 'multi' | 'numeric' | 'para' | 'coding' | 'audio';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  answerIndex?: number;
  points?: number;
  negative?: number;
  timeLimitSec?: number | null;
}

export interface Section {
  id: string;
  title: string;
  durationMins?: number;
  questions: Question[];
}

export interface Exam {
  id: string;
  title: string;
  slug?: string;
  category: 'Government' | 'Banking' | 'Campus & Private' | 'International' | 'Aptitude' | 'Mock';
  language?: string[];
  durationMins: number;
  negativeMarking?: boolean;
  sections: Section[];
  year?: number;
  published?: boolean;
}

export const MOCK_EXAMS: Exam[] = [
  {
    "id": "zekkers-mock-general-apt-2025",
    "title": "Zekkers Mock Test — General Aptitude & Reasoning",
    "slug": "zekkers-mock-general-apt-2025",
    "durationMins": 60,
    "category": "Aptitude",
    "year": 2025,
    "language": ["English"],
    "negativeMarking": true,
    "sections": [
      { "id":"quant", "title":"Quantitative Aptitude", "durationMins":15, "questions":[
        { "id":"q1", "type":"mcq","text":"If x = 5, what is x^3 - 125?","options":["0","125","250","500"],"answerIndex":0, "points": 4, "negative": -1 },
        { "id":"q2", "type":"mcq","text":"A train 150 m long crosses a platform in 30 seconds and a man in 18 seconds. The speed of the train is:","options":["30 km/h","25 km/h","20 km/h","18 km/h"],"answerIndex":0, "points": 4, "negative": -1 },
        { "id":"q3", "type":"mcq","text":"3/4 ÷ (1/2 - 1/8) = ?","options":["3/2","2","4/3","8/3"],"answerIndex":1, "points": 4, "negative": -1 },
        { "id":"q4", "type":"mcq","text":"The average of 5 consecutive even integers is 22. Largest integer?","options":["26","24","28","30"],"answerIndex":0, "points": 4, "negative": -1 },
        { "id":"q5", "type":"mcq","text":"Two numbers are in ratio 3:5 and their LCM is 120. The smaller number is:","options":["9","15","18","24"],"answerIndex":3, "points": 4, "negative": -1 },
        { "id":"q6", "type":"mcq","text":"10% discount & 20% profit. MP is what percent higher than CP?","options":["30%","32%","33.33%","34%"],"answerIndex":2, "points": 4, "negative": -1 }
      ]},
      { "id":"reason", "title":"Logical Reasoning", "durationMins":15, "questions":[
        { "id":"q7","type":"mcq","text":"Next in series: 2,6,18,54,?","options":["108","162","216","324"],"answerIndex":1, "points": 4, "negative": -1},
        { "id":"q8","type":"mcq","text":"If LANGUAGE → KZMFBDZ, code for SYSTEM?","options":["URXQPG","UQRGPK","URQSPK","UQSPGK"],"answerIndex":0, "points": 4, "negative": -1},
        { "id":"q9","type":"mcq","text":"All actors are singers. Some singers are dancers. Which conclusion follows?","options":["Only I","Only II","Both","Neither"],"answerIndex":1, "points": 4, "negative": -1},
        { "id":"q10","type":"mcq","text":"How many 1x1 squares in 5x5 grid?","options":["25","30","35","36"],"answerIndex":0, "points": 4, "negative": -1},
        { "id":"q11","type":"mcq","text":"Odd one out: TRIANGLE,SQUARE,PENTAGON,CIRCLE","options":["TRIANGLE","SQUARE","PENTAGON","CIRCLE"],"answerIndex":3, "points": 4, "negative": -1}
      ]},
      { "id":"eng","title":"English", "durationMins":15, "questions":[
        { "id":"q12","type":"mcq","text":"Choose the correct sentence:","options":["He insisted that she goes.","He insisted that she went.","He insisted that she go.","He insisted that she will go."],"answerIndex":2, "points": 4, "negative": -1},
        { "id":"q13","type":"mcq","text":"Best synonym of 'abate':","options":["Increase","Intensify","Subside","Perish"],"answerIndex":2, "points": 4, "negative": -1},
        { "id":"q14","type":"mcq","text":"The committee _______ its decision after discussion.","options":["reach","reached","had reached","reaches"],"answerIndex":1, "points": 4, "negative": -1},
        { "id":"q15","type":"mcq","text":"He is known for his _______ in difficult situations.","options":["panache","composure","nostalgia","inertia"],"answerIndex":1, "points": 4, "negative": -1},
        { "id":"q16","type":"mcq","text":"Rearrange: best order?","options":["C-A-B-D","C-B-A-D","A-C-B-D","B-C-A-D"],"answerIndex":1, "points": 4, "negative": -1}
      ]},
      { "id":"gk","title":"General Knowledge", "durationMins":15, "questions":[
        { "id":"q17","type":"mcq","text":"Who is the current (2025) UN Secretary-General?","options":["António Guterres","Ban Ki-moon","Kofi Annan","Helen Clark"],"answerIndex":0, "points": 4, "negative": -1},
        { "id":"q18","type":"mcq","text":"BharatNet project relates to:","options":["Mobile manufacturing","Broadband connectivity","Railways modernization","Renewable energy"],"answerIndex":1, "points": 4, "negative": -1},
        { "id":"q19","type":"mcq","text":"RBI was established in:","options":["1920","1935","1947","1950"],"answerIndex":1, "points": 4, "negative": -1},
        { "id":"q20","type":"mcq","text":"Element with atomic number 6:","options":["Oxygen","Carbon","Nitrogen","Helium"],"answerIndex":1, "points": 4, "negative": -1}
      ]}
    ]
  },
  {
    "id": "exam-ssc-cgl",
    "title": "SSC CGL Tier 1 (2023)",
    "slug": "ssc-cgl-tier-1-2023",
    "category": "Government",
    "durationMins": 60,
    "sections": [],
    "year": 2023,
    "language": ["English", "Hindi"],
    published: true,
  },
  {
    "id": "exam-ibps-po",
    "title": "IBPS PO Prelims (2023)",
    "slug": "ibps-po-prelims-2023",
    "category": "Banking",
    "durationMins": 60,
    "sections": [],
    "year": 2023,
    "language": ["English", "Hindi"],
    published: true,
  },
  {
    id: 'exam-jee-main-2024-mock',
    title: 'JEE Main 2024 Mock Paper 1',
    category: 'Mock',
    durationMins: 180,
    language: ['English'],
    sections: [],
    year: 2024,
    published: true,
  },
  {
    id: 'exam-cat-2023-mock',
    title: 'CAT 2023 Mock - Quant & DILR',
    category: 'Mock',
    durationMins: 120,
    language: ['English'],
    sections: [],
    year: 2023,
    published: true,
  },
    {
    id: 'campus-coding-test-2025',
    title: 'Campus Placement Coding Test',
    category: 'Campus & Private',
    durationMins: 90,
    language: ['English'],
    sections: [],
    year: 2025,
    published: true,
  }
];
