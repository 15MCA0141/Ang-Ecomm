import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductMsg: string|undefined;
  errorMsg: string|undefined;
  constructor(private productService: ProductService, private router: Router) {}
  saveProduct(data: Product) {
    if (data.name && data.price && data.category && data.description) {
      console.log(data);
      this.productService.addProduct(data).subscribe((result) => {
        if (result) {
          this.addProductMsg = "Product added successfully!"
        }
      });
    }
    else {
      this.errorMsg = "Fill all mandatory fields!";
    }
    setTimeout(() => {
      this.addProductMsg = undefined; 
      this.errorMsg = undefined;
      this.router.navigate(['seller-home']);
    }, 3000);
  }
}
