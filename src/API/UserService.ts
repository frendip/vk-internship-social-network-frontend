import { tokenType } from '../types/types';

export class UserService {
  static async getMe(token: tokenType) {
    const url = 'http://localhost:3001/getMe';
    return await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token || '',
      },
    });
  }

  static async updateInfo(token: tokenType, obj: { param: string }) {
    const url = 'http://localhost:3001/updateInfo';
    return await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: token || '',
      },
      body: JSON.stringify({
        ...obj,
      }),
    });
  }
}