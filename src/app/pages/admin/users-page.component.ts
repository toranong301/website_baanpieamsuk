import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AdminDataService } from '../../core/admin-data.service';

@Component({
  selector: 'app-users-page',
  imports: [CommonModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  protected readonly adminDataService = inject(AdminDataService);

  protected readonly users = this.adminDataService.visibleUsers;
  protected readonly branches = this.adminDataService.activeBranches();
  protected readonly role = this.adminDataService.role;
}
