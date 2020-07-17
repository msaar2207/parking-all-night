import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  nowDate = new Date();
  dateForm = new FormGroup({});
  constructor(private _fb: FormBuilder, private _route: Router, private _toast: MatSnackBar) {
    this.dateForm = this._fb.group({
      checkIn: new FormControl(new Date(), [Validators.required]),
      checkOut: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  goToBooking() {
    if (this.dateForm.valid) {
      this._route.navigate(['booking'],
        {
          queryParams: {
            from: new Date(this.dateForm.get('checkIn').value).toJSON(),
            to: new Date(this.dateForm.get('checkOut').value).toJSON()
          }
        });
    } else {
      this._toast.open('Please Select Dates');
    }
  }
}
