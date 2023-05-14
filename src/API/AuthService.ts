export class AuthService {
  static async getLogin(email: string, password: string) {
    const url = 'http://localhost:3003/login';
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  static async getRegistration(
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
        email,
        firstname,
        lastname,
        password,
      }),
    });
  }
}
