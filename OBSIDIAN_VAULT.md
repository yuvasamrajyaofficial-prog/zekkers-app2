# 🧠 Zekkers — Obsidian Knowledge Vault Tree

> Create this folder structure in your Obsidian vault for the Zekkers project.

---

## 📂 Vault Structure

```
🏠 Zekkers-Vault/
│
├── 📁 00-Home/
│   ├── 🏠 Dashboard MOC.md               ← Map of Content (start here)
│   ├── 📊 Project Status.md              ← Current build status
│   └── 📅 Roadmap Timeline.md            ← Q3 2026 → Q1 2027
│
├── 📁 01-Architecture/
│   ├── 🏗️ System Overview.md             ← High-level architecture
│   ├── 📦 Tech Stack.md                  ← Next.js 16, React 19, Firebase, Genkit
│   ├── 📂 Project Structure.md           ← src/ folder breakdown
│   ├── 📁 Frontend/
│   │   ├── 🖥️ App Router & Routes.md     ← All 90+ routes documented
│   │   ├── 🎨 UI System.md              ← Shadcn + Radix + Tailwind
│   │   └── ⚡ Animations.md              ← Framer Motion patterns
│   ├── 📁 Backend/
│   │   ├── 🔥 Firebase Setup.md          ← Auth, Firestore, Storage
│   │   ├── 📡 Cloud Functions.md         ← Firebase Functions
│   │   └── 🔐 Security Rules.md         ← Firestore RBAC rules
│   └── 📁 AI-Engine/
│       ├── 🤖 Genkit Config.md           ← genkit.ts setup
│       ├── 📄 Resume Analyzer.md         ← resume-analyzer.ts
│       ├── 📄 Resume Parser.md           ← resume-parser.ts
│       ├── 🏆 Ranking Engine.md          ← ai-ranking-engine.ts
│       ├── 🗺️ Roadmap Generator.md       ← ai-roadmap-generator.ts
│       ├── 🎤 Interview AI.md            ← interview-ai-flow.ts
│       ├── ✉️ Cover Letter Gen.md        ← ai-cover-letter-generator.ts
│       └── 📝 Job Post Generator.md      ← ai-job-post-generator.ts
│
├── 📁 02-Dashboards/
│   ├── 🎓 Student Dashboard.md           ← /dashboard (20 sub-routes)
│   │   ├── Jobs & Applications
│   │   ├── Resume AI Studio
│   │   ├── Interview AI
│   │   ├── Skill Gap & Roadmap
│   │   ├── Quiz, Mock Tests, Exams
│   │   ├── Referrals & Achievements
│   │   └── Profile & Settings
│   ├── 🏫 College Dashboard.md           ← /college-dashboard (13 sub-routes)
│   │   ├── Placement Analytics
│   │   ├── Student Management
│   │   ├── Campus Drives
│   │   └── Employer Partnerships
│   ├── 🌍 Global Employer Dashboard.md   ← /global-employers-dashboard (21 sub-routes)
│   │   ├── ATS Kanban Pipeline
│   │   ├── Candidate Management
│   │   ├── Job Posting & Tools
│   │   ├── Finance & Billing
│   │   └── Organization & Integrations
│   ├── 🤝 NGO Dashboard.md              ← /ngo-dashboard (15 sub-routes)
│   │   ├── Programs & Participants
│   │   ├── Placements & Donors
│   │   └── Analytics & Calendar
│   └── 🛡️ Admin Dashboard.md             ← /admin-dashboard (17 sub-routes)
│       ├── User & KYC Verification
│       ├── Job Moderation
│       ├── Feature Flags & Health
│       └── Billing & Tenants
│
├── 📁 03-Services/
│   ├── 💼 jobs.ts.md                     ← Job CRUD operations
│   ├── 📋 applications.ts.md             ← Application tracking
│   ├── 🎟️ referrals.ts.md                ← Referral codes & rewards
│   ├── ✅ kyc.ts.md                      ← KYC verification flows
│   ├── 🏢 employers.ts.md                ← Employer management
│   ├── 📚 courses.ts.md                  ← Course catalog
│   ├── 📝 assessments.ts.md              ← Assessment engine
│   ├── 🚌 drives.ts.md                   ← Campus drive management
│   ├── 🤝 partners.ts.md                 ← Partner integrations
│   ├── 👤 profile.ts.md                  ← User profile management
│   └── 📊 insights.ts.md                 ← Analytics insights
│
├── 📁 04-Hooks/
│   ├── useCourses.md
│   ├── useEmployers.md
│   ├── useAssessments.md
│   ├── useDrives.md
│   ├── useWorkspaces.md
│   ├── useStudentAnalytics.md
│   ├── useMobile.md
│   └── useToast.md
│
├── 📁 05-Pending-Tasks/
│   ├── Z-1 AI Interview Voice Agent.md
│   ├── Z-2 Career Pathfinding Engine.md
│   ├── Z-3 Resume PDF Generator.md
│   ├── Z-4 SendGrid Email Integration.md
│   ├── Z-5 Organization Panels.md
│   └── Z-6 Admin Moderation Logs.md
│
├── 📁 06-Milestones/
│   ├── ✅ MS1 Firestore Data Sync.md
│   ├── 🟡 MS2 Referral Engine & AI Intake.md
│   └── 🔴 MS3 AI Interviewer & Roadmaps.md
│
├── 📁 07-Static-Pages/
│   ├── Landing Page.md                   ← page.tsx (28KB)
│   ├── About.md
│   ├── Contact.md
│   ├── Blog.md
│   ├── Help Center.md
│   ├── Student Guide.md
│   ├── Recruiter Guidelines.md
│   ├── Verification Standards.md
│   ├── Privacy & Terms.md
│   ├── Legal, Cookie, Data Protection.md
│   └── Accessibility.md
│
├── 📁 08-Open-Source/
│   ├── Contributing Guide.md
│   ├── Code of Conduct.md
│   ├── Style Guide.md
│   ├── Installation Guide.md
│   ├── Deployment Guide.md
│   ├── API Guide.md
│   └── Good First Issues.md
│
└── 📁 09-Sprint-Notes/
    └── (Weekly standup & sprint retrospectives)
```

---

## 🏷️ Tags

| Tag          | Use                        |
| ------------ | -------------------------- |
| `#student`   | Student dashboard features |
| `#college`   | College dashboard features |
| `#employer`  | Global employer features   |
| `#ngo`       | NGO dashboard features     |
| `#admin`     | Admin dashboard features   |
| `#ai`        | Genkit AI flows            |
| `#service`   | Backend service layer      |
| `#hook`      | Custom React hooks         |
| `#pending`   | Not-yet-built features     |
| `#done`      | Completed features         |
| `#milestone` | Roadmap milestones         |

---

## 🔗 Wikilink Template

```markdown
<!-- Example: Z-1 AI Interview Voice Agent.md -->

# Z-1: AI Interview Voice Agent

- **Status:** 🔴 Not Started
- **Priority:** 🔥 High
- **Milestone:** [[MS3 AI Interviewer & Roadmaps]]
- **Dashboard:** [[Student Dashboard]]
- **AI Flow:** [[Interview AI]] (existing flow to extend)
- **Service:** [[profile.ts]] (user data source)
- **Tags:** #ai #student #pending

## Description

Connect real-time web audio output to Genkit evaluation prompts.
Support transcripts and audio playback scorecards.

## Implementation Notes

- Web Speech API for audio capture
- Extend `interview-ai-flow.ts` with audio scoring
- Store transcripts in Firestore `interviews` collection
```

---

## 📊 Dataview Query (Optional Plugin)

Add to `Dashboard MOC.md`:

````markdown
## Pending Tasks

```dataview
TABLE status, priority, milestone
FROM "05-Pending-Tasks"
SORT priority ASC
```

## All AI Flows

```dataview
LIST
FROM "01-Architecture/AI-Engine"
```
````
