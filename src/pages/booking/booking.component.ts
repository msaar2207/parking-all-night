import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/providers/data.service';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingComponent implements OnInit, AfterViewInit {
  @ViewChild('tab', { static: false }) tabs: MatTabGroup;
  checkingForm: FormGroup = new FormGroup({});
  infoForm: FormGroup = new FormGroup({});
  nowDate = new Date();
  panelOpenState = true;

  slots = [
    { available: 7, booked: 10, total: 10, selected: 0, date: (new Date()).setDate((new Date()).getDate() + 1) },
    { available: 4, booked: 6, total: 10, selected: 0, date: (new Date()).setDate((new Date()).getDate() + 2) },
    { available: 8, booked: 2, total: 10, selected: 0, date: (new Date()).setDate((new Date()).getDate() + 3) },
    { available: 1, booked: 9, total: 10, selected: 0, date: (new Date()).setDate((new Date()).getDate() + 4) },
  ];
  carSlotsSelected = [];
  bookingData: { checkin: Date; checkout: Date; days: number; reservationId: number};
  constructor(private _router: ActivatedRoute, private dataService: DataService,private _fbbooking: FormBuilder,private _fbinfo: FormBuilder) {
    this.checkingForm = this._fbbooking.group({
      checkin: new FormControl("", [Validators.required]),
      checkout: new FormControl("", [Validators.required])
    })

    this.infoForm = this._fbinfo.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email, Validators.required])
    })

  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.tabs.selectedIndex = 0;
  }
  getDate(date,type) {
    console.log(date.value,type)
  }
  openDate(date) {
    date.open();
  }
  goToPayment(){
    this.tabs.selectedIndex=2;
    this.getDay();
    this.bookingData={
      checkin:this.checkingForm.get("checkin").value,
      checkout:this.checkingForm.get("checkout").value,
      days:this.getDay(),
      reservationId: Math.floor((Math.random()*99999)+99999)
    }
  }
  removeSlot(i) {
    const slot = this.carSlotsSelected[i];
    slot.selected = 0;
    const slotIndex = this.slots.findIndex(s => s.date === slot.date);
    this.slots[slotIndex].available = this.slots[slotIndex].total - this.slots[slotIndex].booked;
    this.carSlotsSelected.splice(i, 1);
    if (this.carSlotsSelected.length < 1) {
      this.tabs.selectedIndex = 1;
    }
  }
  minusBooking(i) {
    const slot = this.slots[i];
    slot.available = slot.available + 1;
    slot.selected = slot.selected - 1;
    this.slots[i] = slot;
    if (!this.carSlotsSelected.find(s => s.date === slot.date)) {
      this.carSlotsSelected.splice(i, 1);
    }
  }
  addBooking(i) {
    const slot = this.slots[i];
    slot.available = slot.available - 1;
    slot.selected = slot.selected + 1;
    this.slots[i] = slot;
    if (!this.carSlotsSelected.find(s => s.date === slot.date)) {
      this.carSlotsSelected.splice(i, 0, this.slots[i]);
    }
  }
  getDay(): number {

    const diffTime = Math.abs(this.checkingForm.get("checkin").value - this.checkingForm.get("checkout").value);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays + " days");
    return diffDays;
  }
}
