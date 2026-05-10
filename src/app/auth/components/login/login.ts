import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth-service';
import { AuthRequestLogin } from '../../models/auth-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private authService: AuthService, private router: Router){
    this.removeBlink = true;
    setTimeout(() => {
      this.removeBlink = false;
    }, 200);
  }
  loginData: AuthRequestLogin = {
    email: '',
    password: ''
  };
  removeBlink: boolean = true;
  invalidLogin: boolean = false;
  eye: boolean = false;
  viewPassword(){
    this.eye = !this.eye;
  }
  onSuccess: boolean = false;
  submit(){
    this.load = true;
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.onSuccess = true;
        this.authService.successfulAuth(res);
        setTimeout(() => {
          this.router.navigate(['/dashboard/home']);
        }, 250); 
      },
      error: (err) => {
        this.load = false;
        this.invalidLogin = true;
      }
    });
  }
  navigate(){
    this.onSuccess = true;
    setTimeout(() => {
      this.router.navigate(['auth/signup']);
    }, 250); 
    
  }
  load: boolean = false;
}
