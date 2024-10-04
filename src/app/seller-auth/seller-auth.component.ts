import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Login, SignUp } from '../data-type';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
  providers: [SellerService],
})
export class SellerAuthComponent {
  constructor(private seller: SellerService) {}
  showLogin: boolean = false;
  authError: string = '';
  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  login(data: Login): void {
    console.warn('Sending from seller-auth comp: ', data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if(isError) {
        this.authError = "Email or password incorrect!"
      }
    })
  }

  openLogin() {
    this.showLogin = !this.showLogin;
  }
}
