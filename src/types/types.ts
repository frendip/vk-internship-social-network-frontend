export interface ILogin {
  login: string;
  password: string;
}

export interface IRegistration {
  login: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface IUser {
  login: string;
  email: string;
  firstname: string;
  lastname: string;
  backgroundUrl?: string;
  avatarUrl?: string;
  birthday?: string;
  city?: string;
  university?: string;
}

export type tokenType = string;
