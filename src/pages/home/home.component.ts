import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/providers/data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };
  imageObject = [{
    image: 'assets/images/truck1.jpg',
    thumbImage: 'assets/images/truck2.jpg',
    alt: 'alt of image',
    title: 'title of image'
  }, {
    image: 'assets/images/truck2.jpg', // Support base64 image
    thumbImage: 'assets/images/truck2.jpg', // Support base64 image
    title: 'Image title'
  }
  ];
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
  getDate(date, type) {
    console.log(date.value, type)
  }
  openDate(date) {
    date.open();
  }
}
