import { Global, Module } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { ConfigService } from '@nestjs/config';
import { OssController } from './oss.controller';
import { OssService } from './oss.service';

@Global()
@Module({
  controllers: [OssController],
  providers: [
    {
      provide: 'OSS_CLIENT',
      async useFactory(config: ConfigService) {
        const client = new OSS({
          region: config.get('OSS_REGION'),
          bucket: config.get('OSS_BUCKET'),
          accessKeyId: config.get('OSS_ACCESS_KEY_ID'),
          accessKeySecret: config.get('OSS_ACCESS_KEY_SECRECT'),
        });
        return client;
      },
      inject: [ConfigService],
    },
    OssService,
  ],
  exports: ['OSS_CLIENT'],
})
export class OssModule {}
