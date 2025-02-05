import { Module } from '@nestjs/common'
import { BtcnService } from './btcn.service'
import { BtcnController } from './btcn.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [BtcnService],
  controllers: [BtcnController],
})
export class BtcnModule {}
