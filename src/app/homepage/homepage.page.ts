import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  ngOnInit() {}
  items = [
    {
      name: 'AEPS Services',
      service: 'service',
      page: 'aeps',
      routerLink:'/aeps'
    },
    {
      name: 'Bank Transfer',
      service: 'bank',
      page: 'aeps',
      
      routerLink:'/bank-transfer'
    },
    {
      name: 'Pay Your Bills',
      service: 'bills',
      page: 'aeps',
      
      routerLink:'/mobile-recharge'
    },
    {
      name: 'Verify PAN ID',
      service: 'PAN',
      page: 'aeps',
      
      routerLink:'/pan-verify'
    },
  ];
}
