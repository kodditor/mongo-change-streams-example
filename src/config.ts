import { config as dotenvConfig } from "dotenv";
dotenvConfig()

export const config = {
    db: {
        uri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/audit-test',
    }

}