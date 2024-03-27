import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const blogGuard: CanActivateFn = (
  route, 
  state
  ) => {
    if(inject(AuthService).isLoggedIn()){
      return true;
    } else {
      inject(Router).navigate(['/auth/login']);
      return false;
    }
};
