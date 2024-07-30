import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);
  const router = inject(Router);

  // Add your logic here
  if (sellerService.isSellerLoggedIn.value) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
