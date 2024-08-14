import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
productData : undefined | product;
productQuantity:number = 1;
quantity:number = 1;
  constructor(private activeRoute : ActivatedRoute,private product:ProductService){
   let productId =  this.activeRoute.snapshot.paramMap.get('productId');

   productId && this.product.getProduct(productId).subscribe((result)=>{
    this.productData = result;
   })

  }

  handleQuantity(val:string){
    if(val=="plus" &&  this.productQuantity<20){
      this.productQuantity += 1;
    }else if(val=="min" &&  this.productQuantity>1){
      this.productQuantity -= 1;
    }
  }
}
