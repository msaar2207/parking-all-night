import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from '../payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { OnlynumberDirective } from 'src/directives/limit-directive';
import { StripeModule } from 'stripe-angular'


@NgModule({
  declarations: [PaymentComponent, OnlynumberDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StripeModule.forRoot('pk_test_51HMY9KLyeWbwLfQGb2CD0vpSa9LoqDs0HAkaHuPKLiZGIzF4EpE6swvaxhvzk2oN9Gvw1pOp3YqXowJXn9Auctkw00NirS3Ox1')

  ],
  exports: [
    PaymentComponent
  ]
})
export class PaymentModule { }
