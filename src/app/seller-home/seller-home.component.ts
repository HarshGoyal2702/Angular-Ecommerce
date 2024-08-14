import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productMessage: undefined | string;
  productList: undefined | product[];
  icon = faTrash;
  editIcon = faEdit;
  constructor(private product: ProductService) {
    this.List();
  }

  deleteProduct(id: number) {
    console.warn("test id", id)
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product Deleted Successfully";
        this.List();
      }
    })
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  List(){
    this.product.productList().subscribe((result) => {
      console.log(result)
      this.productList = result;
    })
  }




}
