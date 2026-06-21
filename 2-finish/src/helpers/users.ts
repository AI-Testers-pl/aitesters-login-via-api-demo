import type { Credentials } from '@typings/credentials';

const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const demoClientUser: Credentials = {
  username: requireEnv('DEMO_USER_CLIENT_USERNAME'),
  password: requireEnv('DEMO_USER_CLIENT_PASSWORD'),
};
