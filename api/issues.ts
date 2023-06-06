import { createTokenAuth } from '@octokit/auth-token'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Octokit } from 'octokit'

export default async function (req: VercelRequest, res: VercelResponse) {
  console.log('GITHUB_PAT', process.env.GITHUB_PAT)
  const octokit = new Octokit({
    auth: await createTokenAuth(process.env.GITHUB_PAT!)(),
  })
  const issues = await octokit.rest.issues.listForRepo({
    owner: 'secretflow',
    repo: 'secretflow',
    sort: 'created',
    direction: 'desc',
    per_page: 10,
    page: 1,
  })
  return res.json(issues.data)
}
