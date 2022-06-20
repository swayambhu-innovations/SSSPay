import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AadharPageRoutingModule } from './aadhar-routing.module';

import { AadharPage } from './aadhar.page';
import { BaseComponentsModule } from 'src/app/base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AadharPageRoutingModule,
    BaseComponentsModule,
  ],
  declarations: [AadharPage],
})
export class AadharPageModule {}
