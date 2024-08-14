import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchResult :undefined|product[]
  constructor(private activeRoute : ActivatedRoute,private product : ProductService){

    let query = this.activeRoute.snapshot.paramMap.get('query');

    query && this.product.searchProduct(query).subscribe((result)=>{
      this.searchResult = result;
    })
  }
}
