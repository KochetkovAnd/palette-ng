import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { RegisterUser } from '../../models/registerUser';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../../models/user';
import { Palette } from '../../models/palette';
import { ColorInPalette } from '../../models/colorInPalette';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL = "http://localhost:4200/api"
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // LOGIN

  login(username: string, password: string) {
    return this.http.post<RegisterUser>(this.baseURL + "/auth/login",
    {
      username,
      password
    }).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      return of(error)
    }))
  }

  register(username: string, password: string, role: string) {
    return this.http.post<User>(this.baseURL+ "/auth/register", 
    {
      username,
      password,
      role
    },
    {headers: new HttpHeaders().append('Authorization', this.authService.getToken())})
    .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      return of(error);
    }))
  }


  getAvailablePalettes() {
    return this.http.get<Palette[]>(this.baseURL + "/palette/available_palettes",
    {headers: new HttpHeaders().append('Authorization', this.authService.getToken())})
  }

  generate(colorInPalettes: ColorInPalette[], scheme: string) {
    return this.http.post<ColorInPalette[]>(this.baseURL + "/color_in_palette/generate/" + scheme, colorInPalettes,
    {headers: new HttpHeaders().append('Authorization', this.authService.getToken())})
  }
}
