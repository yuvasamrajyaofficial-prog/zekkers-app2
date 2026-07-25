# Changelog

All notable changes to the Yuva Samrajya repositories will be documented in this file.

---

## [0.1.0] - 2026-07-25

### Added

- Created Vercel-grade `.github` workflows, templates, issue forms, pull templates, codeowners, and dependabot alerts.
- Configured local code styling guidelines (`STYLE_GUIDE.md`) and onboarding guides (`INSTALLATION.md`, `DEPLOYMENT.md`).
- Implemented **Zekkers** Referral System: including invite points updates, codes validator on registers, and visual invite log history.
- Upgraded **Zekkers** Resume AI parser to map, index, and save JSON segments directly to candidate profiles database.
- Integrated Firestore persistence layers for **Zekkers** Employers verification (DUNS checks, organization forms, bank configurations).
- Created **Admin Verification Dashboard** to let moderators review and update KYC status hooks.

### Changed

- Re-routed sidebar links config to include **Referrals & Rewards** hub shortcut.
- Cleaned up local Next.js cache directory to clear stale compiler types.
- Fixed `setDocumentNonBlocking` argument options signatures inside KYC and referral services.
