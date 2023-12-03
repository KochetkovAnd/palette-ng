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

  async login() {
    console.log("я начал")
    let response = await lastValueFrom(this.httpService.login(this.username, this.password))
    if (response.token) {
      this.authService.login(response.token, response.role)
      this.router.navigate(['/test'])      
    } else {
      console.log("неправильный пароль")
    }
  }
}
