import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from '../payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { OnlynumberDirective } from 'src/directives/limit-directive';



@NgModule({
  declarations: [PaymentComponent, OnlynumberDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule

  ],
  exports:[
    PaymentComponent
  ]
})
export class PaymentModule { }
