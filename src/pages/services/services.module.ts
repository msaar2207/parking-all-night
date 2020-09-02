import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path:'', component: ServicesComponent
      }
    ])
  ]
})
export class ServicesModule { }
