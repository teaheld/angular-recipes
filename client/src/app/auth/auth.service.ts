import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  private readonly usersUrl = 'http://localhost:3000/users/';

  constructor(private http: HttpClient,
              private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<any>(this.usersUrl + 'register', { email, password })
    .pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(resData.email, resData.id, resData.token, resData.expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.usersUrl + 'login', { email, password })
    .pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(resData.email, resData.id, resData.token, resData.expiresIn);
    }));
  }

  logout() {
    this.user.next(null);

    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');
  }

  autoLogin() {
    const userData: {
      email,
      id,
      _token,
      _expiresIn
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._expiresIn));

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
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

  private handleAuthentication(email, id, token, expiresIn) {
    const user = new User(email, id, token, expiresIn);

    this.user.next(user);

    localStorage.setItem('userData', JSON.stringify(user));
  }
}
