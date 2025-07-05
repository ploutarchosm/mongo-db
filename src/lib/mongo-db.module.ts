import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbConfigService } from './mongodb-config.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (mongodbConfig: MongodbConfigService) => ({
        uri: mongodbConfig.uri,
      }),
      inject: [MongodbConfigService],
    }),
  ],
  providers: [MongodbConfigService],
  exports: [MongodbConfigService],
})
export class MongoDbModule {}
