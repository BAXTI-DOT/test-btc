import { registerAs } from '@nestjs/config'

interface BtcnConfigOptions {
  updateInterval: number
  commission: number
  url: string
}

export const btcnConfig = registerAs(
  'btcn',
  (): BtcnConfigOptions => ({
    updateInterval: parseInt(process.env.UPDATE_INTERVAL, 10) || 10000,
    commission: parseFloat(process.env.COMMISSION) || 0.0001,
    url: process.env.BTCN_URL,
  }),
)
