import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url(),
  AUTH_GITHUB_ID: z.string().min(1, 'GitHub OAuth Client ID가 필요합니다.'),
  AUTH_GITHUB_SECRET: z.string().min(1, 'GitHub OAuth Client Secret이 필요합니다.'),
  AUTH_SECRET: z.string().min(1, 'Auth.js 암호화용 AUTH_SECRET이 필요합니다.'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

const parsedEnv = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
  AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
  AUTH_SECRET: process.env.AUTH_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors)
  throw new Error('환경 변수 설정을 확인해주세요.')
}

export const env = parsedEnv.data

export type Env = typeof env
