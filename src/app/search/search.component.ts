import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchedProducts: undefined|Product[];
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {

  }
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.productService.searchProducts(query).subscribe((result) => {
      this.searchedProducts = result;
    });
  }

}
