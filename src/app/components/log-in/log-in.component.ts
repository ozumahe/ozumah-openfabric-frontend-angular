import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import apiCall from 'src/app/utils/axois';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [AuthService],
})
export class LogInComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LogInComponent>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  email = new FormControl('');
  password = new FormControl('');
  isRequesting: boolean = false;

  onClose(): void {
    this.dialogRef.close();
  }

  async handleLoginSubmit() {
    console.log(this.email.value, this.password.value);

    if (this.email.value && this.password.value) {
      try {
        const res = await apiCall('POST', '/auth/log-in', {
          email: this.email.value,
          password: this.password.value,
        });
        if (res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('token', res.data.token);

          this.authService.checkAuth();
          this.onClose();
          location.reload();
          this.router.navigate(['/']);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
