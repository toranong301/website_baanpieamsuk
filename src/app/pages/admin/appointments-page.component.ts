import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AdminDataService } from '../../core/admin-data.service';

@Component({
  selector: 'app-appointments-page',
  imports: [CommonModule],
  templateUrl: './appointments-page.component.html',
  styleUrl: './appointments-page.component.scss'
})
export class AppointmentsPageComponent {
  protected readonly adminDataService = inject(AdminDataService);

  protected readonly appointments = computed(() =>
    this.adminDataService
      .visibleAppointments()
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date))
  );

  protected readonly notifications = computed(() =>
    this.adminDataService
      .visibleNotifications()
      .slice()
      .sort((a, b) => b.sentAt.localeCompare(a.sentAt))
  );

  protected readonly patients = this.adminDataService.visiblePatients;
}
