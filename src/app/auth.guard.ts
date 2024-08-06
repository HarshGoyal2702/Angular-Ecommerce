import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);
  const router = inject(Router);

  if (localStorage.getItem('seller')) {
    sellerService.isSellerLoggedIn.next(true);
    return true;
  } else {
    router.navigate(['/seller-auth']);
    return false;
  }
};
