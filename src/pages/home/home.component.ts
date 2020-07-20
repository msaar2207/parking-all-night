import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/providers/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  nowDate = new Date();
  dateForm = new FormGroup({});
  gasPrice: any;
  dieselPrice: any;
  constructor(private _fb: FormBuilder, private _route: Router, private _toast: MatSnackBar, private dataService: DataService) {
    this.dateForm = this._fb.group({
      checkIn: new FormControl(new Date(), [Validators.required]),
      checkOut: new FormControl('', [Validators.required]),
    });
    this.dataService.getFuelPrice().subscribe((data: any) => {
      console.log(data);
      const city = data.result.find(d => d.name === 'Tennessee');
      this.gasPrice = parseInt(city.gasoline);
      this.dieselPrice = parseInt(city.diesel);
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
