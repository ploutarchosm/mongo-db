import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbConfigService } from './mongodb-config.service';
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";
import { validateConfig } from "@ploutos/common";
import { EnvironmentVariables } from "./validation";


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
      validate: (config) => validateConfig(config, EnvironmentVariables),
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
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
