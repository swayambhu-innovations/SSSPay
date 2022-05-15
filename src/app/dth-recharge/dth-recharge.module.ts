import { BaseComponentsModule } from './../base-components/base-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DthRechargePageRoutingModule } from './dth-recharge-routing.module';

import { DthRechargePage } from './dth-recharge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DthRechargePageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [DthRechargePage]
})
export class DthRechargePageModule {}