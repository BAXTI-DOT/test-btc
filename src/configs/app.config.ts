import { registerAs } from '@nestjs/config'

interface AppConfigOptions {
  port: number
  host: string
}

export const appConfig = registerAs(
  'app',
  (): AppConfigOptions => ({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3002,
    host: process.env.HOST ?? '127.0.0.1',
  }),
)
