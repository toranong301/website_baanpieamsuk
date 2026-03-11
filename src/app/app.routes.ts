import { Routes } from '@angular/router';
import { ownerOnlyGuard } from './core/owner-only.guard';
import { AdminLayoutComponent } from './pages/admin/admin-layout.component';
import { AppointmentsPageComponent } from './pages/admin/appointments-page.component';
import { BranchesPageComponent } from './pages/admin/branches-page.component';
import { CurrentTreatmentPageComponent } from './pages/admin/current-treatment-page.component';
import { DashboardPageComponent } from './pages/admin/dashboard-page.component';
import { PaymentsPageComponent } from './pages/admin/payments-page.component';
import { PatientsPageComponent } from './pages/admin/patients-page.component';
import { ReportsPageComponent } from './pages/admin/reports-page.component';
import { SettingsPageComponent } from './pages/admin/settings-page.component';
import { TreatmentHistoryPageComponent } from './pages/admin/treatment-history-page.component';
import { UsersPageComponent } from './pages/admin/users-page.component';
import { LandingPageComponent } from './pages/landing/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: 'patients',
        component: PatientsPageComponent
      },
      {
        path: 'treatment-history',
        component: TreatmentHistoryPageComponent
      },
      {
        path: 'current-treatment',
        component: CurrentTreatmentPageComponent
      },
      {
        path: 'appointments',
        component: AppointmentsPageComponent
      },
      {
        path: 'payments',
        component: PaymentsPageComponent
      },
      {
        path: 'reports',
        component: ReportsPageComponent
      },
      {
        path: 'users',
        component: UsersPageComponent
      },
      {
        path: 'branches',
        component: BranchesPageComponent,
        canActivate: [ownerOnlyGuard]
      },
      {
        path: 'settings',
        component: SettingsPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
