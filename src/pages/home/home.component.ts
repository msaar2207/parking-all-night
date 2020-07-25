import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/providers/data.service';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  /*animations: [
    trigger('openClose', [
      // ...
      state('open', style({
          url: "../../assets/images/truck1.jpg"
      })),
      state('closed', style({
        url: "../../assets/images/truck2.jpg"
      })),
      transition('* => closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),
    ]),
  ]*/
})
export class HomeComponent implements OnInit {
  nowDate = new Date();
  dateForm = new FormGroup({});
  isOpen = true;
  gasPrice: any;
  dieselPrice: any;
  constructor(private _fb: FormBuilder, private _route: Router, private _toast: MatSnackBar, private dataService: DataService) {
    this.dateForm = this._fb.group({
      checkin: new FormControl("", [Validators.required]),
      checkout: new FormControl("", [Validators.required]),
    });
    // this.dataService.getFuelPrice().subscribe((data: any) => {
    //   console.log(data);
    //   const city = data.result.find(d => d.name === 'Tennessee');
    //   this.gasPrice = parseInt(city.gasoline);
    //   this.dieselPrice = parseInt(city.diesel);
    // });
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
  }
  goToBooking() {
    this._route.navigate(['booking']);
    // if (this.dateForm.valid) {
    //     {
    //       queryParams: {
    //         from: new Date(this.dateForm.get('checkIn').value).toJSON(),
    //         to: new Date(this.dateForm.get('checkOut').value).toJSON()
    //       }
    //     });
    // } else {
    //   this._toast.open('Please Select Dates');
    // }
  }
  getDate(date,type) {
    console.log(date.value,type)
  }
  openDate(date) {
    date.open();
  }
}
