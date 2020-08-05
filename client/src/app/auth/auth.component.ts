import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    // let authObservable = ..

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(email, password)
        .subscribe( res => {
          this.isLoading = false;
          console.log(res);

          this.router.navigate(['/recipes']);
        }, error => {
          this.isLoading = false;

          this.error = error;
        });
    } else {
      this.authService.signup(email, password)
        .subscribe( res => {
          this.isLoading = false;
          console.log(res);

          this.router.navigate(['/recipes']);
        }, error => {
          this.isLoading = false;

          this.error = error;
        });
    }
    form.reset();
  }
}
