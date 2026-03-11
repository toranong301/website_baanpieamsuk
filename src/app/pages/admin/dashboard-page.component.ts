import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AdminDataService } from '../../core/admin-data.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  private readonly adminDataService = inject(AdminDataService);

  protected readonly role = this.adminDataService.role;
  protected readonly summary = this.adminDataService.dashboardSummary;
  protected readonly treatmentStatus = computed(() =>
    this.adminDataService.treatmentStatusReport()
  );

  protected readonly branchOverview = computed(() =>
    this.adminDataService.activeBranches().map((branch) => ({
      name: branch.name,
      patientCount: this.adminDataService.branchPatientCount(branch.id),
      appointmentCount: this.adminDataService.appointmentsByBranch(branch.id).length,
      overduePayments: this.adminDataService
        .paymentsByBranch(branch.id)
        .filter((payment) => payment.status === 'overdue').length
    }))
  );
}
