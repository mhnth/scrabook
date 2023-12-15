import 'dotenv/config';

const envVars = process.env;

const env = {
  env: envVars.NODE_ENV,
  nextAuthSecret: envVars.NEXTAUTH_SECRET || 'secret1234909533459',
};

export { env };
export default env;
