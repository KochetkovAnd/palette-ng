import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.scss'
})
export class NavbarUserComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  exit() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
