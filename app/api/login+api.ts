import { PixabayApiKey } from '@/constants/Keys'

export async function POST(req: Request) {
  const body = await req.json()
  const { username, password } = body

  if (username !== 'admin' || password !== 'admin') {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
  }

  return new Response(JSON.stringify({ token: PixabayApiKey }), { status: 200 })
}
