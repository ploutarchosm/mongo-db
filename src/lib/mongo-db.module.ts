import { DynamicModule, Logger, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from "@nestjs/config";
import { MongoConfigDto, validateMongoConfig } from './mongo-config.validation';

@Module({})
export class MongoModule implements OnModuleInit {
  private readonly logger = new Logger(MongoModule.name);
  private config: MongoConfigDto;

  static forRoot(): DynamicModule {
    return {
      module: MongoModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            // Validate configuration at module initialization
            const config = validateMongoConfig({
              uri: configService.get<string>('MONGO_DB_URI'),
              retryAttempts: configService.get<number>('MONGO_RETRY_ATTEMPTS'),
              retryDelay: configService.get<number>('MONGO_RETRY_DELAY'),
              dbName: configService.get<string>('MONGO_DB_NAME'),
            });

            return {
              uri: config.uri,
              retryAttempts: config.retryAttempts,
              retryDelay: config.retryDelay,
              dbName: config.dbName,
            };
          },
          inject: [ConfigService],
        }),
      ],
      exports: [MongooseModule],
    };
  }

  onModuleInit() {
    this.logger.log('MongoDB module initialized successfully');
  }
}
