import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import apiCall from 'src/app/utils/axois';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [AuthService],
})
export class SignUpComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SignUpComponent>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  email = new FormControl('');
  name = new FormControl('');
  role: string = '';
  password = new FormControl('');
  isRequesting: boolean = false;

  onClose(): void {
    this.dialogRef.close();
  }

  async handleSignUpSubmit() {
    if (this.email.value && this.password.value) {
      try {
        this.isRequesting = true;
        const res = await apiCall('POST', '/auth/sign-up', {
          email: this.email.value,
          password: this.password.value,
          name: this.name.valid,
          role: this.role,
        });
        if (res.status === 201) {
          this.isRequesting = false;
          console.log(res.data);
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
