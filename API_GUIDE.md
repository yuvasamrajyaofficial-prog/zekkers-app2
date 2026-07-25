# API Guidance & System Services

This file details our service-oriented database architecture and AI flow routing methods.

---

## 💾 Firestore Database API

Our database services are located in `src/services/`. Do not perform ad-hoc `collection()` or `doc()` calls inside front-end visual pages.

### 1. KYC Requests (`src/services/kyc.ts`)

```typescript
submitKycStep(firestore: Firestore, userId: string, stepId: string, details: any): Promise<void>
fetchPendingKycRequests(firestore: Firestore): Promise<KycRequest[]>
approveKycRequest(firestore: Firestore, userId: string, email: string): Promise<void>
```

### 2. Referrals (`src/services/referrals.ts`)

```typescript
generateReferralCode(userId: string): string
fetchUserReferrals(firestore: Firestore, referrerId: string): Promise<Referral[]>
processReferralCode(firestore: Firestore, candidateId: string, name: string, code: string): Promise<void>
```

### 3. Profiles (`src/services/profile.ts`)

```typescript
getUserProfile(firestore: Firestore, userId: string): Promise<ProfileData | null>
saveUserProfile(firestore: Firestore, userId: string, payload: Partial<ProfileData>): void
```

---

## 🤖 Genkit AI API Flows

AI Operations run serverside (`'use server'`) using Google Genkit.

### 1. Resume Parsing Flow (`src/ai/flows/resume-parser.ts`)

- **Route**: Calls `parseResume({ resumeDataUri })`
- **Payload Output**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+91 9999999999",
    "skills": ["TypeScript", "Next.js", "Python"],
    "experience": ["Senior Engineer at Google", "Developer at Startup"],
    "education": ["B.Tech Computer Science, IIT"]
  }
  ```

### 2. Resume Matching Matcher (`src/ai/flows/resume-analyzer.ts`)

- **Route**: Calls `analyzeResumeAgainstJob({ resume, jobDescription })`
- **Response**: Match metrics percentage, strengths checklist list, and areas of development.
