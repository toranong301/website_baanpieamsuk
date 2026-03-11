import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminDataService } from './admin-data.service';

export const ownerOnlyGuard: CanActivateFn = () => {
  const adminDataService = inject(AdminDataService);
  const router = inject(Router);
  return adminDataService.isOwner() ? true : router.parseUrl('/admin/dashboard');
};
