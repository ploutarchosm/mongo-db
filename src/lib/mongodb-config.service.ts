import { MongodbConfig } from './db-config.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongodbConfigService {
    constructor(private configService: ConfigService) {}

    private get config(): MongodbConfig | undefined {
        return this.configService.get<MongodbConfig>('mongodb');
    }

    get uri(): string {
        if (!this.config) {
            throw new Error('MongoDB config is not defined');
        }
        return this.config.uri
    }
}
