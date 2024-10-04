import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';  
  constructor(private route: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if(val.url) {
        if(localStorage.getItem('seller') && val.url.includes('seller')) { //Checking if seller module
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller'); 
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name;
        }
        else { //other than seller area
          this.menuType = 'default';
        }
      }
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProduct(query: KeyboardEvent) {
    if(query) {
      const element = (query.target as HTMLInputElement).value;
      console.log(element);
      this.productService.searchProducts(element).subscribe((product) => {
        console.log(product);
      });
    }
  }
}
