import 'dotenv/config';
import { env } from './config/env.js';
import { connectDatabase } from './db/connect.js';
import app from './app.js';
await connectDatabase();
app.listen(env.PORT, () => console.log(`ImpaExplore API listening on ${env.PORT}`));
