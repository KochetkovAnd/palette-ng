import { Component } from '@angular/core';
import { HttpService } from '../../services/http-service/http.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login-block',
  templateUrl: './login-block.component.html',
  styleUrl: './login-block.component.scss'
})
export class LoginBlockComponent {
  username = ""
  password = ""

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      if (this.authService.getRole() == "USER") {
        this.router.navigate(['/palettes'])
      }      
    }
  }

  async login() {
    let response = await lastValueFrom(this.httpService.login(this.username, this.password))
    if (response.token) {
      this.authService.login(response.token, response.role)
      if (response.role == "USER") {
        this.router.navigate(['/palettes'])
      }            
    } else {
      console.log("неправильный пароль")
    }
  }
}
