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
}
