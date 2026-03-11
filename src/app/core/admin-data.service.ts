import { Injectable, computed, signal } from '@angular/core';
import {
  APPOINTMENTS,
  BRANCHES,
  CURRENT_TREATMENTS,
  NOTIFICATIONS,
  PATIENTS,
  PAYMENTS,
  TREATMENT_HISTORIES,
  USERS
} from './mock-data';
import {
  AdminUser,
  Appointment,
  Branch,
  CurrentTreatmentPlan,
  NotificationLog,
  Patient,
  PatientStatus,
  PaymentRecord,
  PaymentStatus,
  TreatmentHistory,
  UserRole
} from './models';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private readonly roleSignal = signal<UserRole>('owner');
  private readonly branchIdSignal = signal<string>(BRANCHES[0].id);

  readonly role = this.roleSignal.asReadonly();
  readonly branchId = this.branchIdSignal.asReadonly();

  readonly branches = BRANCHES;
  readonly users = USERS;
  readonly patients = PATIENTS;
  readonly treatmentHistories = TREATMENT_HISTORIES;
  readonly currentTreatments = CURRENT_TREATMENTS;
  readonly appointments = APPOINTMENTS;
  readonly notifications = NOTIFICATIONS;
  readonly payments = PAYMENTS;

  readonly visibleBranchIds = computed(() =>
    this.isOwner() ? this.branches.map((branch) => branch.id) : [this.branchIdSignal()]
  );

  readonly visibleBranches = computed(() =>
    this.branches.filter((branch) => this.visibleBranchIds().includes(branch.id))
  );

  readonly visiblePatients = computed(() =>
    this.patients.filter((patient) => this.visibleBranchIds().includes(patient.branchId))
  );

  readonly visibleAppointments = computed(() =>
    this.appointments.filter((appointment) =>
      this.visibleBranchIds().includes(appointment.branchId)
    )
  );

  readonly visibleNotifications = computed(() =>
    this.notifications.filter((notification) =>
      this.visibleBranchIds().includes(notification.branchId)
    )
  );

  readonly visiblePayments = computed(() =>
    this.payments.filter((payment) => this.visibleBranchIds().includes(payment.branchId))
  );

  readonly visibleUsers = computed(() => {
    if (this.isOwner()) {
      return this.users;
    }
    return this.users.filter(
      (user) => user.role === 'owner' || user.branchId === this.branchIdSignal()
    );
  });

  readonly dashboardSummary = computed(() => {
    const visiblePatients = this.visiblePatients();
    const visibleAppointments = this.visibleAppointments();
    const visiblePayments = this.visiblePayments();
    const visibleNotifications = this.visibleNotifications()
      .slice()
      .sort((a, b) => b.sentAt.localeCompare(a.sentAt))
      .slice(0, 5);

    const activePatientCount = visiblePatients.filter((patient) =>
      ['in_treatment', 'follow_up'].includes(patient.status)
    ).length;

    const today = this.todayIso();
    const todaysAppointmentCount = visibleAppointments.filter(
      (appointment) => appointment.date === today
    ).length;

    const overduePaymentCount = visiblePayments.filter(
      (payment) => payment.status === 'overdue'
    ).length;

    const pendingPaymentAmount = visiblePayments
      .filter((payment) => payment.status !== 'paid')
      .reduce((sum, payment) => sum + payment.amount, 0);

    const revenueAmount = visiblePayments
      .filter((payment) => payment.status === 'paid')
      .reduce((sum, payment) => sum + payment.amount, 0);

    const followUpCases = this.currentTreatments.filter((plan) => {
      const patient = this.findPatient(plan.patientId);
      return patient && this.visibleBranchIds().includes(patient.branchId) && plan.status.includes('ติดตาม');
    }).length;

    return {
      activePatientCount,
      todaysAppointmentCount,
      overduePaymentCount,
      pendingPaymentAmount,
      revenueAmount,
      followUpCases,
      latestNotifications: visibleNotifications
    };
  });

  setRole(role: UserRole): void {
    this.roleSignal.set(role);
  }

  setBranch(branchId: string): void {
    const exists = this.branches.some((branch) => branch.id === branchId);
    if (exists) {
      this.branchIdSignal.set(branchId);
    }
  }

  isOwner(): boolean {
    return this.roleSignal() === 'owner';
  }

  activeBranches(): Branch[] {
    return this.branches.filter((branch) => branch.active);
  }

  currentBranch(): Branch | undefined {
    return this.branches.find((branch) => branch.id === this.branchIdSignal());
  }

  findBranch(branchId: string): Branch | undefined {
    return this.branches.find((branch) => branch.id === branchId);
  }

  findPatient(patientId: string): Patient | undefined {
    return this.patients.find((patient) => patient.id === patientId);
  }

  patientName(patientId: string): string {
    return this.findPatient(patientId)?.fullName ?? '-';
  }

  branchName(branchId: string): string {
    return this.findBranch(branchId)?.name ?? '-';
  }

  historiesByPatient(patientId: string): TreatmentHistory[] {
    return this.treatmentHistories
      .filter((history) => history.patientId === patientId)
      .sort((a, b) => b.startDate.localeCompare(a.startDate));
  }

  currentPlanByPatient(patientId: string): CurrentTreatmentPlan | undefined {
    return this.currentTreatments.find((plan) => plan.patientId === patientId);
  }

  statusLabel(status: PatientStatus): string {
    const map: Record<PatientStatus, string> = {
      screening: 'คัดกรอง',
      in_treatment: 'รักษาอยู่',
      follow_up: 'ติดตามอาการ',
      completed: 'สิ้นสุดการรักษา'
    };
    return map[status];
  }

  paymentStatusLabel(status: PaymentStatus): string {
    const map: Record<PaymentStatus, string> = {
      not_due: 'ยังไม่ถึงกำหนด',
      due_soon: 'ใกล้ครบกำหนด',
      overdue: 'ค้างชำระ',
      paid: 'ชำระแล้ว'
    };
    return map[status];
  }

  paymentStatusBadgeClass(status: PaymentStatus): string {
    const map: Record<PaymentStatus, string> = {
      not_due: 'text-bg-secondary',
      due_soon: 'text-bg-warning',
      overdue: 'text-bg-danger',
      paid: 'text-bg-success'
    };
    return map[status];
  }

  branchPatientCount(branchId: string): number {
    return this.patients.filter((patient) => patient.branchId === branchId).length;
  }

  appointmentsByBranch(branchId: string): Appointment[] {
    return this.appointments.filter((appointment) => appointment.branchId === branchId);
  }

  notificationsByBranch(branchId: string): NotificationLog[] {
    return this.notifications.filter((notification) => notification.branchId === branchId);
  }

  paymentsByBranch(branchId: string): PaymentRecord[] {
    return this.payments.filter((payment) => payment.branchId === branchId);
  }

  treatmentStatusReport(): Array<{ label: string; count: number }> {
    const visiblePatients = this.visiblePatients();
    return [
      {
        label: 'คัดกรอง',
        count: visiblePatients.filter((patient) => patient.status === 'screening').length
      },
      {
        label: 'รักษาอยู่',
        count: visiblePatients.filter((patient) => patient.status === 'in_treatment').length
      },
      {
        label: 'ติดตามอาการ',
        count: visiblePatients.filter((patient) => patient.status === 'follow_up').length
      },
      {
        label: 'สิ้นสุดการรักษา',
        count: visiblePatients.filter((patient) => patient.status === 'completed').length
      }
    ];
  }

  owners(): AdminUser[] {
    return this.users.filter((user) => user.role === 'owner');
  }

  private todayIso(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
