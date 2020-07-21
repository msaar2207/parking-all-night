import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { PaymentModule } from '../payment/payment.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatExpansionModule,
    MatTabsModule,
    PaymentModule,
    RouterModule.forChild([
      { path: '', component: BookingComponent }
    ])
  ]
})
export class BookingModule { }
