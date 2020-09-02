import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactusComponent } from './contactus.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ContactusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'', component: ContactusComponent}
    ])
  ]
})
export class ContactusModule { }
