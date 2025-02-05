import { Controller, Get } from '@nestjs/common'
import { BtcnService } from './btcn.service'

@Controller('btc')
export class BtcnController {
  constructor(private readonly btcnService: BtcnService) {}

  @Get('price')
  getPrice() {
    return this.btcnService.getPrice()
  }
}
