import { Component } from '@angular/core';
import {  AuthRequestSignup } from '../../models/auth-model';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  constructor(private authService: AuthService, private router: Router){
    this.removeBlink = true;
    setTimeout(() => {
      this.removeBlink = false;
    }, 200)
  }
  confirmPassword = '';
  signupData: AuthRequestSignup = {
    name: '',
    email: '',
    password: ''
  };
  eye: boolean = false;
  invalidSignup = false;
  onSuccess: boolean = false;
  viewPassword(){
    this.eye = !this.eye;
  }
  verifyPass(){
    if(this.confirmPassword == this.signupData.password){
      return true;
    }else {
      return false;
    }
  }
  submit(){
    this.load = true;
    this.authService.signup(this.signupData).subscribe({
      next: (res) => {
        this.onSuccess = true;
        this.authService.successfulAuth(res);
        setTimeout(() => {
          this.router.navigate(['/dashboard/home']);
        }, 250); 
      },
      error: (err) => {
        this.load = false;
        this.invalidSignup = true;
      }
    });
  }
  navigate(){
    this.onSuccess = true;
    setTimeout(() => {
      this.router.navigate(['auth/login']);
    }, 250); 
    
  }
  removeBlink = true;
  load: boolean = false;
}

