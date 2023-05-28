import { IUser, tokenType } from '../types/types';

export class UserService {
  static async getMe(token: tokenType) {
    const url = 'https://vk-internship-social-network-backend.onrender.com/getMe';
    return await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token || '',
      },
    });
  }

  static async updateMe(token: tokenType, user: IUser) {
    const url = 'https://vk-internship-social-network-backend.onrender.com/updateMe';
    return await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: token || '',
      },
      body: JSON.stringify({
        ...user,
      }),
    });
  }
}
