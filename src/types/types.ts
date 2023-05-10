export interface ILogin {
  email: string;
  password: string;
}

export interface IRegistration extends ILogin {
  firstname: string;
  lastname: string;
}

export interface IPromiseAuth {
  type: string;
  payload: {
    token?: tokenType;
  };
}

export interface IUser {
  email: string;
  firstname: string;
  lastname: string;
  avatarUrl?: string;
  birthday?: string;
  city?: string;
  university?: string;
}

export type tokenType = string;
