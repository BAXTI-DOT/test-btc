import { appConfig, btcnConfig } from '@configs'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BtcnModule } from '@modules'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, btcnConfig],
    }),
    BtcnModule,
  ],
})
export class AppModule {}
