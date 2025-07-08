import { IsNotEmpty, IsString, IsNumber, IsOptional, validateSync, IsUrl } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class MongoConfigDto {
    @IsString()
    @IsNotEmpty({ message: 'MONGO_DB_URI is required for MongoDB module' })
    @IsUrl({}, { message: 'MONGO_DB_URI must be a valid MongoDB connection string' })
    uri: string;

    @IsNumber()
    @IsOptional()
    retryAttempts?: number = 3;

    @IsNumber()
    @IsOptional()
    retryDelay?: number = 1000;

    @IsString()
    @IsOptional()
    dbName?: string;
}

export function validateMongoConfig(config: Record<string, any>): MongoConfigDto {
    const validatedConfig = plainToClass(MongoConfigDto, config);
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        const errorMessages = errors
            .map(error => Object.values(error.constraints || {}).join(', '))
            .join('; ');
        throw new Error(`MongoDB configuration validation failed: ${errorMessages}`);
    }

    return validatedConfig;
}
