# Architecture & Design Overview

This document illustrates the technical design patterns, modular architecture, and service boundaries of the Yuva Samrajya ecosystem.

---

## 🗂️ Component Interaction Chart

```mermaid
graph TD
    Client[Next.js Client app]
    Genkit[Google Genkit AI Flow Engine]
    Gemini[Gemini Pro API]
    Firestore[(Cloud Firestore DB)]
    Storage[(Firebase Storage Bucket)]

    Client -->|User action: Parse Resume| Genkit
    Client -->|CRUD states / KYC / Referrals| Firestore
    Client -->|Upload file: KYC pdf / Avatar| Storage
    Genkit -->|Analyze / Parse Prompts| Gemini
    Genkit -->|Write details| Firestore
    Firestore -->|Onboarding / Invite Points| Client
```

---

## 🔑 Authentication Architecture

```mermaid
sequenceDiagram
    participant User as USER (Next.js Client app)
    participant AuthContext as Next.js AuthContext
    participant FirebaseAuth as Firebase Auth Service
    participant FirestoreRef as users/{uid} document

    User->>AuthContext: Onboarding registration (Name, Role, ReferralCode)
    AuthContext->>FirebaseAuth: Create user credentials
    FirebaseAuth->>AuthContext: Return Firebase User Credentials
    AuthContext->>FirestoreRef: Save ProfileData (Generate unique code, check Referral code)
    FirestoreRef->>AuthContext: Acknowledge write success
    AuthContext->>User: Route to Dashboard
```

---

## 📦 Database Design Patterns

We use `src/firebase/non-blocking-updates.ts` to perform database modifications asynchronously. This pattern avoids delaying UI rendering:

- **KYC Submissions**: Stored under `/kyc_requests/{userId}` document collection. Statuses track `Pending`, `Approved`, or `Rejected`.
- **Referral Connections**: Stored under `/referrals/{referrerId_referredId}`.
- **User Points**: Counters increment using `increment(100)` directly in transaction-safe updates.

---

## 🤖 AI Service Workflows

We use Google Genkit flows inside `src/ai/flows/`:

```mermaid
flowchart LR
    FileUp[Upload Resume PDF] --> Reader[FileReader reads DataURI]
    Reader --> Parser[Genkit parseResume flow]
    Parser --> Mapper[Map string values to ProfileData]
    Mapper --> dbMock[saveUserProfile write to Firestore]
```
