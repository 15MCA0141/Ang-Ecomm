import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/user', data, { observe: 'response' })
      .subscribe((result) => {
        this.isUserLoggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      });
  }
  userLogin(data: Login) {
    console.log('Rcvd in Service: ', data.email, data.password);
    this.http.get<SignUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, {
        observe: 'response',
      })
      .subscribe((result: any) => {
        console.log(result);
        if(result && result.body?.length) {
          console.log('Logged in successfully!');
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
          this.isLoginError.emit(false);
        }
        else {
          console.log('Login failed!');
          this.isLoginError.emit(true);
        }
      });
  }
  reloadUser() {
    if (localStorage.getItem('user')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/']);
    }
  }
}
