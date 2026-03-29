import Groq from 'groq-sdk'
import { GithubRepo } from './github'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

interface RepoData {
  repo: GithubRepo
  languages: Record<string, number>
  readme: string
}

interface GenerateResumeParams {
  repoData: RepoData[]
  role: string
  experienceLevel?: string
  jobDescription: string
  user: {
    name: string
    headline?: string | null
    custom_skills: string[]
  }
}

function buildPrompt(params: GenerateResumeParams): string {
  const { repoData, role, experienceLevel, jobDescription, user } = params

  const repoSummaries = repoData.map((rd) => {
    const langs = Object.keys(rd.languages).slice(0, 5).join(', ')
    return `
Project: ${rd.repo.name}
URL: ${rd.repo.html_url}
Description: ${rd.repo.description || 'No description'}
Languages: ${langs}
Topics: ${rd.repo.topics?.join(', ') || 'none'}
README excerpt: ${rd.readme || 'N/A'}
    `.trim()
  })

  return `You are a professional resume writer specializing in tech resumes.

Generate a resume content JSON for a ${role} developer ${experienceLevel ? `with ${experienceLevel} level expertise` : ''}.
Candidate name: ${user.name}
${user.headline ? `Headline: ${user.headline}` : ''}
${user.custom_skills.length ? `Extra skills: ${user.custom_skills.join(', ')}` : ''}

${jobDescription ? `Target Job Description:\n${jobDescription.slice(0, 1500)}` : ''}

I will provide ${repoData.length} GitHub repositories. You MUST include ALL ${repoData.length} of them in the "projects" array. Do not skip any repository.

GitHub Projects:
${repoSummaries.join('\n\n')}

Return ONLY valid JSON matching this structure:
{
  "projects": [
    {
      "repo_name": "",
      "repo_url": "",
      "description": "one line project description",
      "bullets": ["action verb + what you built + impact", "..."],
      "technologies": ["tech1", "tech2"],
      "live_url": ""
    }
  ],
  "skills": {
    "frontend": [],
    "backend": [],
    "databases": [],
    "tools": []
  },
  "summary": "2-3 sentence professional summary"
}

Rules:
- Include EXACTLY ${repoData.length} projects in the projects array. Do not skip any.
- Each project MUST have 3-4 detailed bullet points.
- bullets must start with strong action verbs (Built, Designed, Implemented, etc.)
- be specific, quantify where possible
- tailor to the job description if provided
- do not fabricate technologies not seen in the repos`
}

export async function generateResume(params: GenerateResumeParams) {
  const prompt = buildPrompt(params)

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  })

  const text = response.choices[0]?.message?.content || '{}'

  try {
    return JSON.parse(text)
  } catch {
    console.error('AI response parse error:', text)
    throw new Error('AI returned invalid JSON')
  }
}
