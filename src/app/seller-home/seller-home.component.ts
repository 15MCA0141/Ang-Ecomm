import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../data-type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  deleteProductMsg: string|undefined;
  errorMsg: string|undefined;
  deleteIcon = faTrashCan;
  updateIcon = faEdit;

  constructor(private productService: ProductService, private router: Router) {}
  
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe((results) => {
      this.productList = results;
    });
  }
  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.getProducts();
        this.deleteProductMsg = "Product deleted successfully!"
      }
      else {
        this.errorMsg = "Something went wrong!";
      }
      setTimeout(() => {
        this.deleteProductMsg = undefined; 
        this.errorMsg = undefined
      }, 3000);
    });
  }
  updateProduct(id: string) {
    this.router.navigate(['seller-update-product']);
    console.log(id);
    
  }
}
