export type UserRole = 'staff' | 'owner';

export type PatientStatus =
  | 'screening'
  | 'in_treatment'
  | 'follow_up'
  | 'completed';

export type PaymentStatus = 'not_due' | 'due_soon' | 'overdue' | 'paid';

export type ReminderChannel = 'email' | 'line';

export interface Branch {
  id: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  openingHours: string;
  managerName: string;
  active: boolean;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  branchId: string | null;
  active: boolean;
}

export interface Patient {
  id: string;
  caseCode: string;
  fullName: string;
  birthDate: string;
  gender: 'ชาย' | 'หญิง' | 'อื่น ๆ';
  phone: string;
  address: string;
  emergencyContact: string;
  substanceHistory: string;
  branchId: string;
  status: PatientStatus;
}

export interface TreatmentHistory {
  id: string;
  patientId: string;
  startDate: string;
  assessment: string;
  diagnosis: string;
  phasePlan: string;
  consultationHistory: string;
  medicationAndTherapy: string;
  followUpResult: string;
  attachmentLabel: string;
}

export interface CurrentTreatmentPlan {
  patientId: string;
  status: string;
  activeProgram: string;
  primaryCaretaker: string;
  nextAppointmentDate: string;
  latestSymptoms: string;
  latestNote: string;
  latestDocument: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  branchId: string;
  type: string;
  date: string;
  receiver: string;
  reminderChannel: ReminderChannel;
  autoSend: boolean;
  status: 'scheduled' | 'completed' | 'pending';
}

export interface NotificationLog {
  id: string;
  branchId: string;
  type: string;
  message: string;
  receiver: string;
  channel: ReminderChannel;
  sentAt: string;
  status: 'success' | 'failed' | 'queued';
}

export interface PaymentRecord {
  id: string;
  patientId: string;
  branchId: string;
  itemName: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paymentProof: string;
  note: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  createdAt: string;
}
