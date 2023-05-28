export class AuthService {
  static async getLogin(login: string, password: string) {
    const url = 'http://localhost:3003/login';
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });
  }

  static async getRegistration(
    login: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ) {
    const url = 'http://localhost:3003/registration';
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        email,
        firstname,
        lastname,
        password,
      }),
    });
  }
}
