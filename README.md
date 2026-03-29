# ResumeAI — AI-Powered Resume Builder

> Turn your GitHub profile into a job-winning resume, tailored for every role you apply to.

Built by **Aditya**.

## Why I Built This

Applying to multiple jobs means tailoring your resume every single time — rewriting the same experience differently for each job description. It's tedious, time-consuming, and easy to miss what actually matters to the recruiter.

**ResumeAI solves this.** It pulls your real work directly from GitHub — your repositories, contributions, tech stack, and project descriptions — and uses AI to generate a professional, ATS-friendly resume tailored specifically to each job description you provide.

No more generic resumes. No more copy-pasting. Just paste a job description, and ResumeAI does the heavy lifting.

---

## What Makes It Non-Trivial

- **GitHub OAuth Integration** — Pulls real repository data, languages, commit activity, and project descriptions directly from your GitHub profile.
- **AI-Powered Tailoring** — Uses Groq-powered AI (Llama 3.3 70B) to analyze job descriptions and intelligently highlight the most relevant experience.
- **ATS Optimization** — Generates keyword-rich bullet points that pass Applicant Tracking Systems.
- **Multi-Resume Management** — Save, update, and manage multiple resume versions for different roles in a custom dashboard.
- **Seamless Export** — Professional templates designed for modern tech roles, ready for PDF export.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React.js, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Backend | Next.js API Routes |
| Database | MongoDB (Mongoose) |
| Auth | NextAuth.js (GitHub OAuth) |
| AI | Groq Cloud API (Llama 3.3 70B) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- GitHub OAuth App credentials
- Groq API key

### Installation
```bash
git clone https://github.com/adityasingh7402/resume-builder-ai
cd resume-builder-ai
npm install
```

### Environment Variables

Create a `.env` file:
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GROQ_API_KEY=your_groq_api_key
```

### Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure
```
resume-builder-ai/
├── app/          # API routes, Auth, Dashboard, Homepage
├── components/   # Reusable UI components (Editor, Navbar, etc.)
├── lib/          # AI logic, DB connection, Authentication
├── models/       # Mongoose Schemas (User, Resume)
├── public/       # Brands, Logos, and static assets
└── types/        # TypeScript models
```

---

## Submission Details

Built for developers who value their time.

| | |
|---|---|
| **Developer** | Aditya |
| **Portfolio** | [adityaportfolio-two.vercel.app](https://adityaportfolio-two.vercel.app/) |
| **GitHub** | [github.com/adityasingh7402](https://github.com/adityasingh7402) |