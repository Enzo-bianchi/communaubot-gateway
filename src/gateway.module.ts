import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [GatewayController],
  providers: [{
    provide: 'MONGO_SERVICE',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.get('MONGO_SERVICE_HOST'),
          port: configService.get('MONGO_SERVICE_PORT')
        }
      })
    }
    },
    {
      provide: 'SEARCH_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('SEARCH_SERVICE_HOST'),
            port: configService.get('SEARCH_SERVICE_PORT')
          }
        })
      }
      }],
})
export class GatewayModule {}
