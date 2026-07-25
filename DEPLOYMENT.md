# Production Deployment Guide

This guide details target host procedures, optimization builds, and deployment instructions for Zekkers & Malola.

---

## 🚀 Target Host Options

### 1. Firebase App Hosting (Recommended)

Zekkers uses Next.js approuter features which map cleanly to Firebase App Hosting:

1. Connect your repository fork to the Firebase Console App Hosting setting.
2. The engine detects next configurations, parses `apphosting.yaml`, and spins up automated CD pipelines.
3. Configure Firestore and Storage rules within Firebase security panels.

### 2. Vercel Hosting

Our repository includes custom Next configs and configurations optimized for Vercel deployment:

1. Connect your Github workspace to a Vercel project container.
2. Set Environment Variables identical to your local `.env`.
3. Vercel will automatically compile, optimize, and build static/dynamic routes.

---

## 🛠️ Production Build Verification

Before triggering git push or merging PRs, verify that the compilation bundle builds cleanly:

```bash
# Clean cache
rm -rf .next
# Run production build compilation
npm run build
```

Ensure no fatal errors or unrecognized type hooks are reported.
