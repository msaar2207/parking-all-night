import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';
import { DataService } from 'src/providers/data.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/providers/utils.service';
import { StripeToken, StripeSource } from 'stripe-angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  invalidError: any;
  @Input() bookingData;
  ccForm: FormGroup = new FormGroup({});
  cardReady = false;
  extraData = {
    name: null,
    address_city: null,
    address_line1: null,
    address_line2: null,
    address_state: null,
    address_zip: null
  };
  constructor(private _fb: FormBuilder, private _dataService: DataService, private _router: Router, private _utilService: UtilsService) {
    this.ccForm = this._fb.group({
      cardNumber: new FormControl('', [
        Validators.minLength(16),
        Validators.required,
        CreditCardValidators.validateCCNumber,
      ]),
      cardName: new FormControl('', [Validators.required]),
      expiry: new FormControl('', [
        Validators.required,
        CreditCardValidators.validateExpDate,
      ]),
      cvv: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
      ]),
    });
    this.ccForm.valueChanges.subscribe(console.log);
  }


  ngOnInit(): void { }

  submit(token) {
    this._utilService.loading = true;
    const booking = {
      user: this.bookingData.user,
      checkIn: this.bookingData.checkin,
      checkOut: this.bookingData.checkout,
      bookingDays: this.bookingData.days,
      unitPrice: 25,
      totalPrice: 25 * this.bookingData.days,
      reservationId: this.bookingData.reservationId,
      token: token.id
    };
    this._dataService.createBooking(booking).subscribe((data: any) => {
      if (data.status) {
        console.log(data);
        this._utilService.loading = false;
        this._router.navigate(['thankyou'], {
          queryParams: {
            recieptNumber: this.bookingData.reservationId,
            email: this.bookingData.user.email
          }
        });
      }
    });
  }

  onStripeInvalid(error: Error) {
    console.log('Validation Error', error);
  }

  setStripeToken(token: StripeToken) {
    console.log(this.bookingData)
    this.submit(token);
  }

  setStripeSource(source: StripeSource) {
    console.log('Stripe source', source);
  }

  onStripeError(error: Error) {
    console.error('Stripe error', error);
  }
}
