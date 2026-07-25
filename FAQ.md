# Frequently Asked Questions (FAQ)

Here are answers to common questions about configuring, running, and contributing to Yuva Samrajya projects.

---

## 💻 Technical & Configuration

### Q: Why is `npm run typecheck` failing with "Cannot find module" errors?

**A**: Ensure you run `npm install` first. If you recently pulled updates that restructured directories, Next.js cache might hold stale references. Clear `.next` cache using:

```bash
# PowerShell
Remove-Item -Recurse -Force .next
# Bash
rm -rf .next
```

Then re-run `npm run typecheck`.

### Q: How do I configure Genkit AI locally?

**A**: Zekkers utilizes Google Genkit. Make sure to set `GEMINI_API_KEY` or appropriate Google Application Credentials in your local `.env`. Ensure your terminal has correct access keys loaded before starting the dev server.

---

## 🤝 Participation & Contribs

### Q: Can beginners contribute to Zekkers or Malola?

**A**: Absolutely! Look for the `good first issue` and `beginner friendly` labels. We encourage first-time contributors. If you are stuck, create an issue under `Question or Help Request`.

### Q: Do you sponsor contributors?

**A**: Yes! Contributions are tracked and point milestones relate to organization rewards. Sponsor channels are also located in our [FUNDING.yml](.github/FUNDING.yml).
