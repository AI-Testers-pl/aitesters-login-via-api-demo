export type AuthSession = {
  token: string;
  refreshToken: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
};
