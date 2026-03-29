# GitCV — AI-Powered Resume Builder from GitHub

> Turn your GitHub profile into a job-winning resume, tailored for every role you apply to.

## Why I Built This

Applying to multiple jobs means tailoring your resume every single time — rewriting the same experience differently for each job description. It's tedious, time-consuming, and easy to miss what actually matters to the recruiter.

**GitCV solves this.** It pulls your real work directly from GitHub — your repositories, contributions, tech stack, and project descriptions — and uses AI to generate a professional, ATS-friendly resume tailored specifically to each job description you provide.

No more generic resumes. No more copy-pasting. Just paste a job description, and GitCV does the heavy lifting.

---

## What Makes It Non-Trivial

- **GitHub OAuth Integration** — Pulls real repository data, languages, commit activity, and project descriptions directly from your GitHub profile
- **AI-Powered Tailoring** — Uses Groq/Gemini to analyze the job description and intelligently highlight the most relevant experience from your GitHub
- **ATS Optimization** — Generates keyword-rich resumes that pass Applicant Tracking Systems
- **Multi-Resume Management** — Save, update, and manage multiple resume versions for different roles
- **Subscription Model** — Free tier with limited generations, Pro tier for unlimited access
- **Admin Dashboard** — Full platform analytics and user management
- **Secure Auth** — NextAuth with JWT, role-based access control

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React.js, TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| Backend | Next.js API Routes, Node.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | NextAuth.js (GitHub OAuth + JWT) |
| AI | Groq / Google Gemini API |
| Payments | Stripe / Dodo Payments |
| Deployment | Vercel + GitHub Actions CI/CD |

---

## Core Features

### For Job Seekers
- Connect GitHub account in one click
- Paste any job description
- Get a tailored, ATS-optimized resume instantly
- Save multiple resume versions per role
- Download as PDF

### For Admins
- User management dashboard
- Subscription and usage analytics
- Platform-wide controls

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- GitHub OAuth App credentials
- Groq or Gemini API key

### Installation
```bash
git clone https://github.com/yourusername/gitcv
cd gitcv
npm install
```

### Environment Variables

Create a `.env.local` file:
```env
# Database
MONGODB_URI=your_mongodb_uri

# Auth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# AI
GROQ_API_KEY=your_groq_api_key
# or
GEMINI_API_KEY=your_gemini_api_key

# Payments
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure
```
gitcv/
├── app/
│   ├── api/          # API routes (auth, github, resume, admin)
│   ├── dashboard/    # User dashboard
│   ├── admin/        # Admin panel
│   └── page.tsx      # Landing page
├── components/       # Reusable UI components
├── lib/              # DB connection, AI clients, utilities
├── models/           # Mongoose models
│   ├── UserModel.ts
│   ├── resumeModel.ts
│   ├── jobDescriptionModel.ts
│   ├── AdminModel.ts
│   └── subscriptionModel.ts
└── types/            # TypeScript type definitions
```

---

## Deployment

Deployed on **Vercel** with automatic CI/CD via GitHub Actions.

Every push to `main` triggers:
- Type checking
- Build verification
- Automatic deployment

Live at: [your-deployment-url.vercel.app](https://your-deployment-url.vercel.app)

---

## Submission Details

Built as part of the **House of Edtech Full Stack Developer Assignment**.

| | |
|---|---|
| **Developer** | Your Name |
| **GitHub** | [github.com/yourusername](https://github.com/yourusername) |
| **LinkedIn** | [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile) |