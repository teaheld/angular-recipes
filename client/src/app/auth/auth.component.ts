import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.isLoading = false;
    } else {
      this.authService.signup(email, password)
        .subscribe( res => {
          this.isLoading = false;
          console.log(res);
        });
    }
    form.reset();
  }
}
