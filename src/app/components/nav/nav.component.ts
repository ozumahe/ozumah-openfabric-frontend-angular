import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import apiCall from 'src/app/utils/axois';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [AuthService],
})
export class NavComponent implements OnInit {
  constructor(public authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.authService.checkAuth();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogInDialog, {
      maxWidth: '500px',
      width: '100%',
      height: '400px',
    });
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
  styleUrls: ['./nav.component.css'],
  providers: [AuthService],
})
export class LogInDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LogInDialog>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  email = new FormControl('');
  password = new FormControl('');

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
