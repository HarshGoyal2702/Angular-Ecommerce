import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}


  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  userSignUp(data: signUp) {
    this.http
      .post('http://localhost:3000/seller', data,{observe:'response'})
      .subscribe((result) => {console.warn(result)
        if(result){
          this.isSellerLoggedIn.next(true)
        }
       });
  }
}
