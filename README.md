# MongoDB Wrapper For Nest.js

A simple wrapper for MongoDB + Nest.js

## Installation

```bash
npm install @ploutos/mongo-db
```

## Variables
```dotenv
MONGO_DB_URI=//mongodb://127.0.0.1:27017
MONGO_RETRY_ATTEMPTS=3
MONGO_RETRY_DELAY=1000
MONGO_DB_NAME=app
```
## Usage
```typescript
import { MongoDbModule } from '@ploutos/mongo-db';

@Module({
  imports: [MongoDbModule.forRoot()]
})
export class AppModule {}
```
## Notes
Only the ***MONGO_DB_URI*** variable is required.	
