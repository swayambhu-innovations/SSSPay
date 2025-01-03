import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanVerifyPageRoutingModule } from './pan-verify-routing.module';

import { PanVerifyPage } from './pan-verify.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanVerifyPageRoutingModule,
    BaseComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PanVerifyPage],
})
export class PanVerifyPageModule {}
