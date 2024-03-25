import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  static canActivate: any;
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(): boolean {
    const auth = this.storageService.getItem('logged_in');

    if (auth === 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivate();
};
