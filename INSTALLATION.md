# Installation & Workspace Setup

Follow this guide to configure and run the Zekkers/Malola codebase locally.

---

## 🛠️ Step-by-Step Instructions

### Prerequisites

- Node.js v20.x or higher
- NPM v10.x or higher
- Git

### 1. Retrieve the Repository

Clone the repository:

```bash
git clone https://github.com/yuvasamrajyaofficial-prog/zekkers-app2.git
cd zekkers-app2
```

### 2. Configure Environment Parameters

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill out the variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`: API Key from Firebase Console
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Auth settings hook
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Target Firebase Project identifier
- `GEMINI_API_KEY`: Gemini API key for Genkit flows

### 3. Bootstrap Dependencies

```bash
npm install
```

### 4. Initiate Local Development Server

Execute the Next.js dev server:

```bash
npm run dev
```

Open **`http://localhost:3000`** in your browser to verify configuration.

---

## 🤖 Launching AI Developer Environments

To test Google Genkit AI flows locally (e.g. resume matching, astrology helpers):

```bash
npm run genkit:dev
```

This triggers the Genkit developer UI tool, letting you execute and test custom flows in isolation.
