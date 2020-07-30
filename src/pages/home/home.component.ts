import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/providers/data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { OwlOptions } from 'ngx-owl-carousel-o';
export const fade = trigger('fade', [
  state('inactive', style({
    background: "url('../../assets/images/truck1.jpg')", 'background-size': 'cover',
    'background-position': 'center',
    'background-repeat': 'no-repeat',
  })),
  state('active', style({
    background: "url('../../assets/images/truck2.jpg')", 'background-size': 'cover',
    'background-position': 'center',
    'background-repeat': 'no-repeat',
  })),
  transition('* <=> *', [
    animate(2000)
  ])
]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fade]
})
export class HomeComponent implements OnInit {
  nowDate = new Date();
  dateForm = new FormGroup({});
  isOpen = true;
  gasPrice: any;
  dieselPrice: any;
  playAnimation = false;
  constructor(private _fb: FormBuilder, private _route: Router, private _toast: MatSnackBar, private dataService: DataService) {
    this.dateForm = this._fb.group({
      checkin: new FormControl('', [Validators.required]),
      checkout: new FormControl('', [Validators.required]),
    });
    setInterval(() => { this.playAnimation = !this.playAnimation; }, 5000);
    this.dataService.getFuelPrice('gas').subscribe((data: any) => {
      console.log(data);
      // const city = data.result.find(d => d.name === 'Tennessee');
      // this.gasPrice = parseInt(city.gasoline);
      // this.dieselPrice = parseInt(city.diesel);
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
  }
  goToBooking() {
    if (this.dateForm.valid) {
        this._route.navigate(['booking'], {
          queryParams: {
            checkin: new Date(this.dateForm.get('checkin').value).toJSON(),
            checkout: new Date(this.dateForm.get('checkout').value).toJSON()
          }
        });
      } else {
        this._toast.open('Please Select Dates');
      }
    }
    getDate(date, type) {
      console.log(date.value, type)
    }
    openDate(date) {
      date.open();
    }
  }
