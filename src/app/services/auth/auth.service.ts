import { Injectable } from '@angular/core';
import apiCall from 'src/app/utils/axois';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  userData: any = null;

  checkAuth() {
    const user: any = localStorage.getItem('user');

    if (JSON.parse(user)) {
      this.userData = JSON.parse(user);
    }
  }
}
