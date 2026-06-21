import { demoClientUser } from '@helpers/users';
import type { APIRequestContext } from '@playwright/test';
import type { AuthSession } from '@typings/authSession';
import type { Credentials } from '@typings/credentials';

const signInEndpoint = '/api/v1/users/signin';

export const signInViaApi = async (
  request: APIRequestContext,
  credentials: Credentials = demoClientUser
): Promise<AuthSession> => {
  const response = await request.post(signInEndpoint, {
    data: { username: credentials.username, password: credentials.password },
  });

  if (!response.ok()) {
    throw new Error(`API login failed for "${credentials.username}": ${response.status()} ${response.statusText()}`);
  }

  const session: AuthSession = await response.json();

  return session;
};
