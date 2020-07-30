import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankyouComponent } from './thankyou.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ThankyouComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:ThankyouComponent}
    ])
  ]
})
export class ThankyouModule { }
