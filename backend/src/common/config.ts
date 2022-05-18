import { config } from 'dotenv-flow';
import * as path from 'path';

const root = path.join.bind(this, __dirname);
config({ path: root('../../') });

export default {
  DATABASE: {
    URI: `${process.env.DATABASE_URI}cursova`,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: '3600s',
    IGNORE_EXPIRATION: true,
  },
};
