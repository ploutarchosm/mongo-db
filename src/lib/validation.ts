import { IsString } from 'class-validator';

export class EnvironmentVariables {
    @IsString()
    MONGODB_URI: string;
}
