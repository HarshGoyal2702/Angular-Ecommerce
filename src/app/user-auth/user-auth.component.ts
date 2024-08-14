import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  constructor(private user:UserService ){
    this.user.userAuthReload();
  }
  signUp(data:signUp){

    this.user.userSignUp(data)

  }
}
