import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Fixed styleUrls
})
export class HeaderComponent {
  menuType:string = 'default';
  sellerName: string = "";
  searchResult: undefined | product[];
  userName:string = "";
cartItems=0;
  constructor(private router: Router, private product: ProductService) {
    // Subscribe to router events
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user'
        }
        else {
          this.menuType = 'default';
        }
      }
    }
    );

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length;
    })
  }


  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['user-auth'])
  }


  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      this.product.searchProduct(element.value).subscribe((result) => {
        console.log(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }


  submitSearch(val:string){
    this.router.navigate([`search/${val}`])
  }

  redirectToDetails(id:number){
    this.router.navigate([`details/${id}`])
  }
}
