import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { AdminDataService } from '../../core/admin-data.service';

@Component({
  selector: 'app-payments-page',
  imports: [CommonModule],
  templateUrl: './payments-page.component.html',
  styleUrl: './payments-page.component.scss'
})
export class PaymentsPageComponent {
  constructor(protected readonly adminDataService: AdminDataService) {}

  protected readonly payments = computed(() =>
    this.adminDataService
      .visiblePayments()
      .slice()
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  );

  protected readonly paymentSummary = computed(() => {
    const items = this.payments();
    return {
      notDue: items.filter((item) => item.status === 'not_due').length,
      dueSoon: items.filter((item) => item.status === 'due_soon').length,
      overdue: items.filter((item) => item.status === 'overdue').length,
      paid: items.filter((item) => item.status === 'paid').length
    };
  });
}
