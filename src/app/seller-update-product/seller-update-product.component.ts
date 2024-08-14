import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMessage : string | undefined;
  constructor(private route: ActivatedRoute, private product: ProductService) {
    let productId = this.route.snapshot.paramMap.get('id')
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productData = data;
    })
  }
  Submit(data: product) {
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if(result){
        this.productMessage = "Product Updated successfully";
      }
    })

    setTimeout(()=>{
      this.productMessage = undefined;
    },3000)
  }
}
