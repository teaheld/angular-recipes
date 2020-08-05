import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly usersUrl = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post(this.usersUrl + 'register', { email, password });
  }
}
