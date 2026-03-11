import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminDataService } from '../../core/admin-data.service';
import { UserRole } from '../../core/models';

interface MenuItem {
  label: string;
  route: string;
  ownerOnly?: boolean;
}

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  private readonly adminDataService = inject(AdminDataService);

  protected readonly role = this.adminDataService.role;
  protected readonly branchId = this.adminDataService.branchId;
  protected readonly branches = this.adminDataService.branches;
  protected readonly isOwner = computed(() => this.adminDataService.isOwner());
  protected readonly currentBranchName = computed(
    () => this.adminDataService.currentBranch()?.name ?? '-'
  );

  protected readonly menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/admin/dashboard' },
    { label: 'ข้อมูลผู้เข้ารับการรักษา', route: '/admin/patients' },
    { label: 'ประวัติการรักษา', route: '/admin/treatment-history' },
    { label: 'แผนการรักษาปัจจุบัน', route: '/admin/current-treatment' },
    { label: 'นัดหมายและแจ้งเตือน', route: '/admin/appointments' },
    { label: 'ค่าใช้จ่าย / การชำระเงิน', route: '/admin/payments' },
    { label: 'รายงาน', route: '/admin/reports' },
    { label: 'จัดการผู้ใช้งาน', route: '/admin/users' },
    { label: 'จัดการสาขา', route: '/admin/branches', ownerOnly: true },
    { label: 'ตั้งค่าระบบ', route: '/admin/settings' }
  ];

  protected setRole(role: UserRole): void {
    this.adminDataService.setRole(role);
  }

  protected setBranch(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.adminDataService.setBranch(target.value);
  }
}
