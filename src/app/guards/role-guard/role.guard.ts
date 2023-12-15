import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { HttpService } from '../../services/http-service/http.service';

@Injectable({
  providedIn: 'root'
})
class PermissionService {
  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      let role = this.authService.getRole()
      let isUser = role == "USER"
      switch (next.routeConfig?.path) {
        case 'palettes':
          return isUser
        case 'generate_palette':
          return isUser
        case 'generate_wheel_palette':
          return isUser
      }
    }
    this.router.navigate(['/login'])
    return false
  }
}

export const roleGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionService).canActivate(next, state)
};
