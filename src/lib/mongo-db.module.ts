import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbConfigService } from "./mongodb-config.service";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (mongodbConfig: MongodbConfigService) => ({
                uri: mongodbConfig.uri
            }),
            inject: [MongodbConfigService],
        }),
    ],
    providers: [MongodbConfigService], // Remove MongooseModule from here
})
export class MongoDbModule {}
