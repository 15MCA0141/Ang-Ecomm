import { Component } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  constructor(private userService: UsersService) {}
  showLogin: boolean = false;
  authError: string = '';

  ngOnInit(): void {
    this.userService.reloadUser();
  }
  signUp(data: SignUp): void {
    this.userService.userSignUp(data);
  }

  login(data: Login): void {
    console.warn('Sending from user-auth comp: ', data);
    this.userService.userLogin(data);
    this.userService.isLoginError.subscribe((isError) => {
      if(isError) {
        this.authError = "Email or password incorrect!"
      }
    });
  }

  openLogin() {
    this.showLogin = !this.showLogin;
  }
}
