import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SellerService } from './services/seller.service';


export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);
  if (!sellerService.isSellerLoggedIn) {
    return false;
  }
  if (sellerService.isSellerLoggedIn) {
    return true;
  }
  if (localStorage.getItem('seller')) {
    return true;
  }
  return sellerService.isSellerLoggedIn;
};
 