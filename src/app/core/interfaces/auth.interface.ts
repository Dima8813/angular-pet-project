export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  name?: string;
  surname?: string;
  bio?: string;
}

export interface Login {
  accessToken?: string;
  user: User;
}
