export interface ILogin {
  email: string;
  password: string;
}

export interface IRegistration extends ILogin {
  firstname: string;
  lastname: string;
}

export type tokenType = string;
