import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const components1 = [HeaderComponent]
@NgModule({
  exports:[components1],
  declarations: [components1],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class BaseComponentsModule { }
