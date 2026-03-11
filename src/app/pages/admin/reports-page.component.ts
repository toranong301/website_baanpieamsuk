import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AdminDataService } from '../../core/admin-data.service';

@Component({
  selector: 'app-reports-page',
  imports: [CommonModule],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.scss'
})
export class ReportsPageComponent {
  private readonly adminDataService = inject(AdminDataService);

  protected readonly role = this.adminDataService.role;
  protected readonly treatmentStatus = computed(() =>
    this.adminDataService.treatmentStatusReport()
  );

  protected readonly reportSummary = computed(() => {
    const visiblePatients = this.adminDataService.visiblePatients();
    const visibleAppointments = this.adminDataService.visibleAppointments();
    const visiblePayments = this.adminDataService.visiblePayments();

    return {
      totalPatients: visiblePatients.length,
      newCasesThisMonth: this.newCasesCount(),
      appointmentPending: visibleAppointments.filter((item) => item.status === 'pending').length,
      overduePayments: visiblePayments.filter((item) => item.status === 'overdue').length,
      followUpCases: visiblePatients.filter((patient) => patient.status === 'follow_up').length
    };
  });

  protected readonly branchRows = computed(() =>
    this.adminDataService.activeBranches().map((branch) => ({
      name: branch.name,
      patientCount: this.adminDataService.branchPatientCount(branch.id),
      newCases: this.newCasesCountByBranch(branch.id),
      overduePayments: this.adminDataService
        .paymentsByBranch(branch.id)
        .filter((payment) => payment.status === 'overdue').length
    }))
  );

  private newCasesCount(): number {
    const monthPrefix = new Date().toISOString().slice(0, 7);
    return this.adminDataService.treatmentHistories.filter((history) =>
      history.startDate.startsWith(monthPrefix)
    ).length;
  }

  private newCasesCountByBranch(branchId: string): number {
    const monthPrefix = new Date().toISOString().slice(0, 7);
    return this.adminDataService.treatmentHistories.filter((history) => {
      if (!history.startDate.startsWith(monthPrefix)) {
        return false;
      }
      return this.adminDataService.findPatient(history.patientId)?.branchId === branchId;
    }).length;
  }
}
