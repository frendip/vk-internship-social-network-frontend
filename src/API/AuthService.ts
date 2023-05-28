export class AuthService {
  static async getLogin(login: string, password: string) {
    const url = 'https://vk-internship-social-network-backend.onrender.com/login';
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
    const url = 'https://vk-internship-social-network-backend.onrender.com/registration';
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
