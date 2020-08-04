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

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() bookingData;
  ccForm: FormGroup = new FormGroup({});
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

  submit() {
    this._utilService.loading = true;
    const booking = {
      user: this.bookingData.user,
      checkIn: this.bookingData.checkin,
      checkOut: this.bookingData.checkout,
      bookingDays: this.bookingData.days,
      unitPrice: 25,
      totalPrice: 25 * this.bookingData.days,
      reservationId: this.bookingData.reservationId
    };
    this._dataService.createBooking(booking).subscribe((data: any) => {
      if (data.status) {
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
}
