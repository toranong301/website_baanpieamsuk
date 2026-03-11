import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { AdminDataService } from '../../core/admin-data.service';

@Component({
  selector: 'app-current-treatment-page',
  imports: [CommonModule],
  templateUrl: './current-treatment-page.component.html',
  styleUrl: './current-treatment-page.component.scss'
})
export class CurrentTreatmentPageComponent {
  constructor(protected readonly adminDataService: AdminDataService) {}

  protected readonly treatmentRows = computed(() =>
    this.adminDataService
      .visiblePatients()
      .map((patient) => ({
        patient,
        plan: this.adminDataService.currentPlanByPatient(patient.id)
      }))
      .filter((row) => !!row.plan)
  );
}
