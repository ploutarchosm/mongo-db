import * as process from 'node:process';

export default () => ({
    mongodb: {
        uri: process.env.MONGODB_URI
    },
});
