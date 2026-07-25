# Contributing to Yuva Samrajya

We are delighted that you want to contribute to the Yuva Samrajya ecosystem! By joining us, you help shape the future of AI-powered career growth (Zekkers) and spiritual software (Malola).

Before participating, please review our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## 🛠️ Getting Started

### 1. Fork the Repository

Click the **Fork** button at the top-right of the page to create a your own copy of the repository.

### 2. Clone Locally

Clone your fork to your development machine:

```bash
git clone https://github.com/YOUR_USERNAME/zekkers-app2.git
cd zekkers-app2
```

### 3. Set Up Local Environment

Copy `.env.example` to `.env` and fill out your Firebase and Genkit configuration keys (refer to [INSTALLATION.md](INSTALLATION.md)):

```bash
cp .env.example .env
```

### 4. Install Dependencies & Build

Install node modules:

```bash
npm install
npm run typecheck
```

---

## 📐 Coding Standards

### Folder Structure

Make sure to put new code in the correct locations:

- `src/app/`: Routing pages (Candidates, Employers, Admins).
- `src/components/`: Reusable components (buttons, tables, inputs).
- `src/services/`: Firestore and storage helper functions.
- `src/ai/`: Genkit AI prompts and custom flows.

### Coding Style

- Use TypeScript for all files (no raw JS).
- Avoid adding any `TODO` placeholders in production-bound files.
- Format lines cleanly, ensuring that all brackets are properly closed.
- Strictly check type signatures.

### Git Branching Strategy

Create branches from `main` using structured nomenclature:

- `feat/your-cool-feature`
- `fix/bug-fix-description`
- `docs/improve-onboarding`
- `chore/update-dependencies`

### Commit Message Guidelines

We follow standard semantic commits:

- `feat: add resume parser backend integration`
- `fix: resolve setDocumentNonBlocking optional parameters mismatch`
- `docs: update API routing instructions`
- `refactor: clean up employer organizations profile modals`

---

## 🚀 Pull Request Checklist

When submitting a PR:

1. Ensure `npm run typecheck` succeeds without warning or error.
2. Link the PR to the relevant issue using `Closes #XXX`.
3. Provide screenshots or screen recordings (WebP format) showing visual changes.
4. Set required reviewers as listed in [CODEOWNERS](.github/CODEOWNERS).
