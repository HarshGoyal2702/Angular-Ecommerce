import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe({
        next: (result: any) => {
          if (result && result.body) {
            localStorage.setItem('seller', JSON.stringify(result.body));
            this.isSellerLoggedIn.next(true);
            this.router.navigate(['seller-home']);
          }
        },
        error: (error) => {
          console.error('Error during sign up:', error);
        }
      });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data:login){
    console.warn(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
      console.warn(result);
      if(result && result.body && result.body.length){
        console.warn("user logged in");
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);

      }
      else{
        console.warn("user not found");
        this.isLoginError.emit(true);
      }
    })
  }

  // Uncomment and use if needed
  // logout() {
  //   this.isSellerLoggedIn.next(false);
  //   localStorage.removeItem('seller');
  //   this.router.navigate(['/login']);
  // }
}
