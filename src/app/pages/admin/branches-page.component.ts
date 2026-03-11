import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AdminDataService } from '../../core/admin-data.service';

@Component({
  selector: 'app-branches-page',
  imports: [CommonModule],
  templateUrl: './branches-page.component.html',
  styleUrl: './branches-page.component.scss'
})
export class BranchesPageComponent {
  protected readonly adminDataService = inject(AdminDataService);

  protected readonly branches = this.adminDataService.branches;
  protected readonly branchStates = signal<Record<string, boolean>>(
    Object.fromEntries(this.adminDataService.branches.map((branch) => [branch.id, branch.active]))
  );

  protected isActive(branchId: string): boolean {
    return this.branchStates()[branchId] ?? false;
  }

  protected toggleBranch(branchId: string): void {
    this.branchStates.update((states) => ({
      ...states,
      [branchId]: !states[branchId]
    }));
  }
}
