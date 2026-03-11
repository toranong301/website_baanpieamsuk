import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { AdminDataService } from '../../core/admin-data.service';

@Component({
  selector: 'app-treatment-history-page',
  imports: [CommonModule],
  templateUrl: './treatment-history-page.component.html',
  styleUrl: './treatment-history-page.component.scss'
})
export class TreatmentHistoryPageComponent {
  protected readonly adminDataService = inject(AdminDataService);

  constructor() {
    const firstPatient = this.patients()[0];
    if (firstPatient) {
      this.selectedPatientId.set(firstPatient.id);
    }
  }

  protected readonly patients = this.adminDataService.visiblePatients;
  protected readonly selectedPatientId = signal<string>('');

  protected readonly selectedPatient = computed(() =>
    this.adminDataService.findPatient(this.selectedPatientId())
  );

  protected readonly histories = computed(() =>
    this.adminDataService.historiesByPatient(this.selectedPatientId())
  );

  protected setPatient(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedPatientId.set(target.value);
  }
}
