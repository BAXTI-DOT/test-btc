import { HttpService } from '@nestjs/axios'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Decimal from 'decimal.js'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class BtcnService implements OnModuleInit {
  private btcPrice = { bid: 0, ask: 0, mid: 0 }
  private updateInterval: number
  private commission: number
  private url: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.updateInterval = this.configService.get<number>('btcn.updateInterval')
    this.commission = this.configService.get<number>('btcn.commission')
    this.url = this.configService.getOrThrow<string>('btcn.url')
  }

  async #_fetchPrice() {
    const response = await firstValueFrom(this.httpService.get(this.url))

    const { bidPrice, askPrice } = response.data

    const bid = new Decimal(bidPrice).times(new Decimal(1).minus(this.commission))
    const ask = new Decimal(askPrice).times(new Decimal(1).plus(this.commission))
    const mid = bid.plus(ask).div(2)

    this.btcPrice = {
      bid: bid.toNumber(),
      ask: ask.toNumber(),
      mid: mid.toNumber(),
    }
  }

  getPrice() {
    return this.btcPrice
  }

  async onModuleInit() {
    await this.#_fetchPrice()
    setInterval(() => this.#_fetchPrice(), this.updateInterval)
  }
}
