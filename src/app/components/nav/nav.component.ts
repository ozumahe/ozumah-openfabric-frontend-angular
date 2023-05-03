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
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LogInComponent } from '../log-in/log-in.component';

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

  openLogInDialog(): void {
    const dialogRef = this.dialog.open(LogInComponent, {
      maxWidth: '500px',
      width: '100%',
      height: '400px',
    });
  }

  openSignUpDialog(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      maxWidth: '500px',
      width: '100%',
      minHeight: '400px',
    });
  }
}
