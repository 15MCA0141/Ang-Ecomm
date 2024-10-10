import { Product } from './../data-type';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  featuredProducts: undefined | Product[];
  productList: undefined | Product[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.featuredProducts().subscribe((product) => {
      this.featuredProducts = product;
    });
    this.productService.getProducts().subscribe((product) => {
      this.productList = product;
    });
  }
}
