# MongoDB Wrapper For Nest.js

A simple wrapper for MongoDB + Nest.js

## Installation

```bash
npm install @ploutos/mongo-db
```

## Usage
```typescript
import { MongoDbModule } from '@ploutos/mongo-db';

@Module({
  imports: [MongoDbModule]
})
export class AppModule {}
```

