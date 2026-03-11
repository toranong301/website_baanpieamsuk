import {
  ActivityLog,
  AdminUser,
  Appointment,
  Branch,
  CurrentTreatmentPlan,
  NotificationLog,
  Patient,
  PaymentRecord,
  TreatmentHistory
} from './models';

export const BRANCHES: Branch[] = [
  {
    id: 'branch-bkk',
    code: 'BPS-BKK',
    name: 'บ้านเปี่ยมสุข สาขากรุงเทพ',
    address: '12/8 ซอยลาดพร้าว 101 แขวงคลองจั่น เขตบางกะปิ กรุงเทพฯ',
    phone: '02-210-9001',
    email: 'bkk@baanpieamsuk.com',
    mapUrl: 'https://maps.google.com/?q=13.788,100.624',
    openingHours: 'ทุกวัน 08:00 - 20:00 น.',
    managerName: 'พญ.ชุติมา จันทร์ศรี',
    active: true
  },
  {
    id: 'branch-cm',
    code: 'BPS-CM',
    name: 'บ้านเปี่ยมสุข สาขาเชียงใหม่',
    address: '88 หมู่ 4 ต.สันผีเสื้อ อ.เมืองเชียงใหม่ จ.เชียงใหม่',
    phone: '053-181-455',
    email: 'cm@baanpieamsuk.com',
    mapUrl: 'https://maps.google.com/?q=18.818,98.992',
    openingHours: 'จันทร์ - เสาร์ 08:30 - 18:30 น.',
    managerName: 'นพ.อนุชา ภูมิพันธุ์',
    active: true
  },
  {
    id: 'branch-kkn',
    code: 'BPS-KKN',
    name: 'บ้านเปี่ยมสุข สาขาขอนแก่น',
    address: '55/9 ถ.มิตรภาพ ต.ในเมือง อ.เมืองขอนแก่น จ.ขอนแก่น',
    phone: '043-240-091',
    email: 'kkn@baanpieamsuk.com',
    mapUrl: 'https://maps.google.com/?q=16.438,102.828',
    openingHours: 'ทุกวัน 09:00 - 19:00 น.',
    managerName: 'คุณมยุรี ศรีบุญเรือง',
    active: false
  }
];

export const USERS: AdminUser[] = [
  {
    id: 'owner-01',
    fullName: 'คุณวรวิทย์ เปี่ยมสุข',
    email: 'owner@baanpieamsuk.com',
    phone: '089-111-2222',
    role: 'owner',
    branchId: null,
    active: true
  },
  {
    id: 'staff-bkk-01',
    fullName: 'คุณสุภาพร ใจดี',
    email: 'supaporn@baanpieamsuk.com',
    phone: '081-245-8800',
    role: 'staff',
    branchId: 'branch-bkk',
    active: true
  },
  {
    id: 'staff-cm-01',
    fullName: 'คุณธนา รัตน์กุล',
    email: 'thana@baanpieamsuk.com',
    phone: '089-880-7744',
    role: 'staff',
    branchId: 'branch-cm',
    active: true
  },
  {
    id: 'staff-kkn-01',
    fullName: 'คุณอาทิตยา บุญมาก',
    email: 'atid@baanpieamsuk.com',
    phone: '087-981-5601',
    role: 'staff',
    branchId: 'branch-kkn',
    active: false
  }
];

export const PATIENTS: Patient[] = [
  {
    id: 'pt-0001',
    caseCode: 'BPS-2026-0001',
    fullName: 'นายภูมิพัฒน์ มั่นคง',
    birthDate: '1995-05-14',
    gender: 'ชาย',
    phone: '086-111-2233',
    address: 'แขวงวังทองหลาง เขตวังทองหลาง กรุงเทพฯ',
    emergencyContact: 'นางสาวธัญญารัตน์ (พี่สาว) 089-222-7799',
    substanceHistory: 'เมทแอมเฟตามีน 3 ปี / เคยบำบัด 1 ครั้ง',
    branchId: 'branch-bkk',
    status: 'in_treatment'
  },
  {
    id: 'pt-0002',
    caseCode: 'BPS-2026-0002',
    fullName: 'นายชนะพล วิริยะ',
    birthDate: '1988-02-11',
    gender: 'ชาย',
    phone: '095-400-1122',
    address: 'เขตจตุจักร กรุงเทพฯ',
    emergencyContact: 'คุณบุษบา (มารดา) 081-432-1299',
    substanceHistory: 'สุราเรื้อรัง 10 ปี',
    branchId: 'branch-bkk',
    status: 'follow_up'
  },
  {
    id: 'pt-0003',
    caseCode: 'BPS-2026-0003',
    fullName: 'นางสาวพิมพ์ชนก ทองดี',
    birthDate: '1997-10-02',
    gender: 'หญิง',
    phone: '094-115-7788',
    address: 'อ.เมืองเชียงใหม่ จ.เชียงใหม่',
    emergencyContact: 'นายทรงพล (บิดา) 098-782-4112',
    substanceHistory: 'กัญชาและยานอนหลับ 1.5 ปี',
    branchId: 'branch-cm',
    status: 'in_treatment'
  },
  {
    id: 'pt-0004',
    caseCode: 'BPS-2026-0004',
    fullName: 'นายธีรภัทร์ บุญชัย',
    birthDate: '1992-07-23',
    gender: 'ชาย',
    phone: '090-217-9901',
    address: 'อ.แม่ริม จ.เชียงใหม่',
    emergencyContact: 'นางสาวกัญญา (ภรรยา) 090-210-4568',
    substanceHistory: 'สารระเหย 2 ปี',
    branchId: 'branch-cm',
    status: 'screening'
  },
  {
    id: 'pt-0005',
    caseCode: 'BPS-2026-0005',
    fullName: 'นายณรงค์ฤทธิ์ แสงทอง',
    birthDate: '1983-01-08',
    gender: 'ชาย',
    phone: '082-020-6177',
    address: 'อ.เมืองขอนแก่น จ.ขอนแก่น',
    emergencyContact: 'คุณสุนีย์ (ภรรยา) 082-564-8989',
    substanceHistory: 'เฮโรอีน 7 ปี',
    branchId: 'branch-kkn',
    status: 'completed'
  }
];

export const TREATMENT_HISTORIES: TreatmentHistory[] = [
  {
    id: 'th-001',
    patientId: 'pt-0001',
    startDate: '2026-01-12',
    assessment: 'ประเมินความเสี่ยงสูง ต้องติดตามใกล้ชิด',
    diagnosis: 'Substance Use Disorder ระดับรุนแรง',
    phasePlan: 'Detox 4 สัปดาห์ + Group Therapy',
    consultationHistory: 'เข้าคำปรึกษา 4 ครั้ง / เดือน',
    medicationAndTherapy: 'ใช้ยาและ CBT ต่อเนื่อง',
    followUpResult: 'อาการดีขึ้น ไม่มี relapse',
    attachmentLabel: 'ใบประเมินรอบแรก.pdf'
  },
  {
    id: 'th-002',
    patientId: 'pt-0002',
    startDate: '2025-11-05',
    assessment: 'มีความเสี่ยง relapse ช่วงเครียด',
    diagnosis: 'Alcohol Dependency',
    phasePlan: 'Rehab 8 สัปดาห์ + Family Session',
    consultationHistory: 'ติดตามรายสัปดาห์',
    medicationAndTherapy: 'Motivational Interviewing',
    followUpResult: 'เข้าสู่ระยะ follow-up',
    attachmentLabel: 'สรุปแผนบำบัดปี 2025.pdf'
  },
  {
    id: 'th-003',
    patientId: 'pt-0003',
    startDate: '2026-02-20',
    assessment: 'ต้องเสริมทักษะการจัดการอารมณ์',
    diagnosis: 'Mixed Substance Use',
    phasePlan: 'Detox + Individual Therapy',
    consultationHistory: '2 ครั้งภายใน 14 วัน',
    medicationAndTherapy: 'Dialectical Behavior Therapy',
    followUpResult: 'ตอบสนองดี อาการนอนไม่หลับลดลง',
    attachmentLabel: 'ผลวินิจฉัยรอบ 2.pdf'
  },
  {
    id: 'th-004',
    patientId: 'pt-0004',
    startDate: '2026-03-08',
    assessment: 'อยู่ช่วงคัดกรองเบื้องต้น',
    diagnosis: 'รอตรวจเพิ่มเติม',
    phasePlan: 'ประเมินเชิงลึก 7 วัน',
    consultationHistory: 'ให้คำปรึกษา 1 ครั้ง',
    medicationAndTherapy: 'ยังไม่เริ่มยา',
    followUpResult: 'นัดหมายประเมินครั้งถัดไป',
    attachmentLabel: 'แบบฟอร์มคัดกรอง.pdf'
  }
];

export const CURRENT_TREATMENTS: CurrentTreatmentPlan[] = [
  {
    patientId: 'pt-0001',
    status: 'อยู่ระหว่างฟื้นฟู',
    activeProgram: 'โปรแกรมฟื้นฟูเข้มข้น 90 วัน',
    primaryCaretaker: 'คุณสุภาพร ใจดี',
    nextAppointmentDate: '2026-03-11',
    latestSymptoms: 'นอนหลับดีขึ้น อาการกระวนกระวายน้อยลง',
    latestNote: 'มีแรงสนับสนุนจากครอบครัวดี',
    latestDocument: 'บันทึกติดตามอาการ_มี.ค._สัปดาห์2.pdf'
  },
  {
    patientId: 'pt-0002',
    status: 'ติดตามอาการต่อเนื่อง',
    activeProgram: 'โปรแกรมดูแลต่อเนื่องรายเดือน',
    primaryCaretaker: 'คุณสุภาพร ใจดี',
    nextAppointmentDate: '2026-03-15',
    latestSymptoms: 'ยังมี trigger ในช่วงกลางคืน',
    latestNote: 'แนะนำทำแผนรับมือ trigger',
    latestDocument: 'followup_checklist.pdf'
  },
  {
    patientId: 'pt-0003',
    status: 'อยู่ระหว่างฟื้นฟู',
    activeProgram: 'โปรแกรมเดี่ยว + กลุ่มบำบัด',
    primaryCaretaker: 'คุณธนา รัตน์กุล',
    nextAppointmentDate: '2026-03-12',
    latestSymptoms: 'ความกังวลลดลง',
    latestNote: 'นัดทำแบบประเมินซ้ำสัปดาห์หน้า',
    latestDocument: 'care_plan_cm_2026_03.pdf'
  }
];

export const APPOINTMENTS: Appointment[] = [
  {
    id: 'ap-001',
    patientId: 'pt-0001',
    branchId: 'branch-bkk',
    type: 'นัดพบนักบำบัด',
    date: '2026-03-11',
    receiver: 'ญาติผู้ดูแล',
    reminderChannel: 'line',
    autoSend: true,
    status: 'scheduled'
  },
  {
    id: 'ap-002',
    patientId: 'pt-0002',
    branchId: 'branch-bkk',
    type: 'ติดตามผลหลังบำบัด',
    date: '2026-03-15',
    receiver: 'ผู้เข้ารับการรักษา',
    reminderChannel: 'email',
    autoSend: true,
    status: 'pending'
  },
  {
    id: 'ap-003',
    patientId: 'pt-0003',
    branchId: 'branch-cm',
    type: 'นัดพบแพทย์',
    date: '2026-03-12',
    receiver: 'ผู้เข้ารับการรักษา',
    reminderChannel: 'line',
    autoSend: false,
    status: 'scheduled'
  },
  {
    id: 'ap-004',
    patientId: 'pt-0004',
    branchId: 'branch-cm',
    type: 'ประเมินซ้ำ',
    date: '2026-03-20',
    receiver: 'ญาติผู้ดูแล',
    reminderChannel: 'email',
    autoSend: true,
    status: 'pending'
  }
];

export const NOTIFICATIONS: NotificationLog[] = [
  {
    id: 'nt-001',
    branchId: 'branch-bkk',
    type: 'กำหนดชำระค่ารักษา',
    message: 'แจ้งเตือนยอดค้างชำระของเคส BPS-2026-0001',
    receiver: 'ญาติผู้ดูแล',
    channel: 'line',
    sentAt: '2026-03-10T09:12:00',
    status: 'success'
  },
  {
    id: 'nt-002',
    branchId: 'branch-bkk',
    type: 'นัดหมายพบแพทย์',
    message: 'แจ้งนัดหมายวันที่ 11 มี.ค. 2026',
    receiver: 'ผู้เข้ารับการรักษา',
    channel: 'email',
    sentAt: '2026-03-10T14:30:00',
    status: 'success'
  },
  {
    id: 'nt-003',
    branchId: 'branch-cm',
    type: 'เอกสารไม่ครบ',
    message: 'ขอเอกสารใบยินยอมเพิ่มเติม',
    receiver: 'ญาติผู้ดูแล',
    channel: 'email',
    sentAt: '2026-03-11T08:45:00',
    status: 'queued'
  },
  {
    id: 'nt-004',
    branchId: 'branch-cm',
    type: 'วันติดตามผล',
    message: 'แจ้งติดตามผลรอบ 30 วัน',
    receiver: 'ผู้เข้ารับการรักษา',
    channel: 'line',
    sentAt: '2026-03-09T16:30:00',
    status: 'success'
  }
];

export const PAYMENTS: PaymentRecord[] = [
  {
    id: 'pm-001',
    patientId: 'pt-0001',
    branchId: 'branch-bkk',
    itemName: 'ค่าโปรแกรมฟื้นฟูเดือนมีนาคม',
    amount: 32000,
    dueDate: '2026-03-14',
    status: 'due_soon',
    paymentProof: 'ยังไม่อัปโหลด',
    note: 'รอชำระงวดที่ 2'
  },
  {
    id: 'pm-002',
    patientId: 'pt-0002',
    branchId: 'branch-bkk',
    itemName: 'ค่าติดตามอาการรายเดือน',
    amount: 6500,
    dueDate: '2026-03-05',
    status: 'overdue',
    paymentProof: 'ยังไม่อัปโหลด',
    note: 'ติดต่อญาติแล้วรอชำระ'
  },
  {
    id: 'pm-003',
    patientId: 'pt-0003',
    branchId: 'branch-cm',
    itemName: 'ค่าตรวจประเมินรอบแรก',
    amount: 12000,
    dueDate: '2026-03-10',
    status: 'paid',
    paymentProof: 'slip_pt0003_20260310.jpg',
    note: 'ชำระครบแล้ว'
  },
  {
    id: 'pm-004',
    patientId: 'pt-0004',
    branchId: 'branch-cm',
    itemName: 'ค่าประเมินเชิงลึก',
    amount: 8500,
    dueDate: '2026-03-22',
    status: 'not_due',
    paymentProof: 'ยังไม่ถึงกำหนด',
    note: 'รอถึงกำหนดเรียกชำระ'
  }
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'lg-001',
    userId: 'staff-bkk-01',
    action: 'อัปเดตสถานะการรักษาเคส BPS-2026-0001',
    createdAt: '2026-03-10T13:12:00'
  },
  {
    id: 'lg-002',
    userId: 'owner-01',
    action: 'สร้างบัญชีแอดมินสาขาเชียงใหม่',
    createdAt: '2026-03-09T10:20:00'
  },
  {
    id: 'lg-003',
    userId: 'staff-cm-01',
    action: 'ตั้งแจ้งเตือนประเมินซ้ำเคส BPS-2026-0004',
    createdAt: '2026-03-11T09:05:00'
  }
];
