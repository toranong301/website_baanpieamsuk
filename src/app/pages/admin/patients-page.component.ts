import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AdminDataService } from '../../core/admin-data.service';
import { PatientStatus } from '../../core/models';

@Component({
  selector: 'app-patients-page',
  imports: [CommonModule],
  templateUrl: './patients-page.component.html',
  styleUrl: './patients-page.component.scss'
})
export class PatientsPageComponent {
  protected readonly adminDataService = inject(AdminDataService);

  protected readonly mode = signal<'list' | 'form'>('list');
  protected readonly patients = this.adminDataService.visiblePatients;
  protected readonly branches = this.adminDataService.visibleBranches;
  protected readonly role = this.adminDataService.role;

  protected setMode(mode: 'list' | 'form'): void {
    this.mode.set(mode);
  }

  protected ageFromBirthdate(birthDate: string): number {
    const year = Number(birthDate.slice(0, 4));
    return new Date().getFullYear() - year;
  }

  protected statusClass(status: PatientStatus): string {
    const map: Record<PatientStatus, string> = {
      screening: 'text-bg-secondary',
      in_treatment: 'text-bg-primary',
      follow_up: 'text-bg-info',
      completed: 'text-bg-success'
    };
    return map[status];
  }
}
