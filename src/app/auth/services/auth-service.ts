import { Injectable } from '@angular/core';
import { AuthLoginResponse, AuthRequestLogin, AuthRequestSignup } from '../models/auth-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router){}
  // Be the source of truth 
  private apiUrl = 'http://192.168.200.166:3004/api';
  setToken(token: string){
    localStorage.setItem('token', token);
  }
  setUserId(userId: number){
    localStorage.setItem('userId', String(userId));
  }
  getUserId(){
    return parseInt(localStorage.getItem('userId') || "-1");
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getName(){
    return localStorage.getItem('name');
  }
  getEmail(){
    return localStorage.getItem('email');
  }
  getRole(){
    return localStorage.getItem('role');
  }
  
  logout(){
    const remove = ['token', 'userId', 'noteId', 'categ', 'notes', 'noteState', 'page', 'username', 'email', 'role'];
    for (const item of remove){
      localStorage.removeItem(item);
    }
    this.router.navigate(['auth/login']);
  }

  successfulAuth(res: AuthLoginResponse){
    console.log(res);
    this.setToken(res.jwt);
    this.setUserId(res.user.id);
    this.setEmail(res.user.email);
    this.setName(res.user.name);
    this.setRole(res.user.role);

  }
  setName(name: string){
    localStorage.setItem('name', name);
  }
  setEmail(email: string){
    localStorage.setItem('email', email);
  }
  setRole(role: string){
    localStorage.setItem('role', role);
  }

  login(data: AuthRequestLogin){
    return this.http.post<AuthLoginResponse>(`${this.apiUrl}/login`, data);
  }
  signup(data: AuthRequestSignup){
    return this.http.post<AuthLoginResponse>(`${this.apiUrl}/signup`, data);
  }
}
