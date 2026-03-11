import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminDataService } from '../../core/admin-data.service';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  private readonly adminDataService = inject(AdminDataService);

  protected readonly branches = this.adminDataService.activeBranches();

  protected readonly testimonials = [
    {
      title: 'กลับมาใช้ชีวิตได้อีกครั้ง',
      detail:
        'ทีมงานให้การดูแลอย่างใกล้ชิด มีทั้งการบำบัดรายบุคคลและการติดตามครอบครัว ทำให้เราผ่านช่วงยากที่สุดมาได้',
      author: 'ครอบครัวผู้เข้ารับการดูแล'
    },
    {
      title: 'ระบบติดตามชัดเจนมาก',
      detail:
        'มีการแจ้งเตือนนัดหมายและติดตามอาการต่อเนื่อง ทำให้ไม่พลาดการรักษาและเห็นพัฒนาการที่ชัดเจน',
      author: 'ผู้ดูแลประจำเคส'
    },
    {
      title: 'บรรยากาศปลอดภัยและเป็นส่วนตัว',
      detail:
        'สถานที่สะอาด เป็นสัดส่วน ทีมสหวิชาชีพให้คำปรึกษาอย่างเข้าใจ ไม่ตัดสิน',
      author: 'ผู้ผ่านโปรแกรมฟื้นฟู'
    }
  ];

  protected readonly news = [
    {
      title: '5 สัญญาณที่ควรเริ่มเข้ารับคำปรึกษา',
      date: '11 มีนาคม 2026',
      summary: 'สังเกตอาการเบื้องต้นและแนวทางเริ่มต้นรับการช่วยเหลืออย่างปลอดภัย'
    },
    {
      title: 'แนวทางการดูแลผู้ป่วยหลังจบโปรแกรม 90 วัน',
      date: '6 มีนาคม 2026',
      summary: 'บทบาทครอบครัวและแผนติดตามผลที่ช่วยลดโอกาสกลับไปใช้ซ้ำ'
    },
    {
      title: 'กิจกรรมกลุ่มบำบัดและการฟื้นฟูทักษะชีวิต',
      date: '1 มีนาคม 2026',
      summary: 'ภาพรวมกิจกรรมเสริมที่ช่วยสร้างวินัยและความมั่นใจในการกลับสู่สังคม'
    }
  ];
}
