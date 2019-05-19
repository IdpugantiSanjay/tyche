export interface User {
  username: string;
  password: string;
  email: string;
  settings: Map<string, any>;
}
