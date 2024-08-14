import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NgbCarouselModule,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  popularProducts : undefined | product[];
  trendyProducts : undefined | product[];
constructor(private product:ProductService){
  this.product.popularProduct().subscribe((data)=>{
    this.popularProducts = data;
  })
  this.product.trendyProduct().subscribe((data)=>{
    this.trendyProducts = data;
  })
}
}
