import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  nowDate= new Date();
  checkIn= new FormControl();
  checkOut= new FormControl();
  constructor() { }

  ngOnInit(): void {
  }

}
