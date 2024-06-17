export interface User {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  authorizationToken: string;
  password: string;
  role: {
    name: string;
  };
}
