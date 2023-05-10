export interface ILogin {
  email: string;
  password: string;
}

export interface IRegistration extends ILogin {
  firstname: string;
  lastname: string;
}

export interface IPromiseAuth {
  payload: {
    token?: tokenType;
  };
}

export type tokenType = string;
