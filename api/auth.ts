import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query
  if (!code) {
    return res.status(400).json({ message: 'Missing code' })
  }
  const endpoint = new URL('https://github.com/login/oauth/access_token')
  const query = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    repository_id: process.env.GITHUB_REPOSITORY_ID,
    code: code as string,
  })
  endpoint.search = query.toString()
  const { access_token } = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (r) => {
    const data = (await r.json()) as Promise<{ access_token: string }>
    console.log(data)
    return data
  })
  return res.json({ access_token })
}
