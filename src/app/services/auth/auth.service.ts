import { Injectable } from '@angular/core';
import apiCall from 'src/app/utils/axois';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  user = null;

  async logIn() {
    try {
      const res = await apiCall('POST', '/auth/log-in');
      if (res.status === 200) {
        // this.user = res.data;
        console.log(res.data);
      }
    } catch (e) {}
  }
}
