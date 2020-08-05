import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly usersUrl = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post(this.usersUrl + 'register', { email, password })
    .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post(this.usersUrl + 'login', { email, password })
    .pipe(catchError(this.handleError));
  }

  private handleError(err) {
    let error = 'An unknown error occured';

    if (err.error) {
      switch (err.error.errorMessage) {
        case 'EMAIL_EXISTS':
          error = 'Email already exists';
          break;
        case 'INVALID_DATA':
          error = 'Invalid username or password';
          break;
      }
    }

    return throwError(error);
  }
}
