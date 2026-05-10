import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth-service';

export const authInterceptorsInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  if(!token) return next(req);
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    } 
  });
  return next(req);
};
