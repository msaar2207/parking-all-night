import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  checkIn = new FormControl();
  checkOut = new FormControl();
  nowDate = new Date();
  slots = [
    { available: 7, booked: 3, total: 10, date: (new Date()).setDate((new Date()).getDate() + 1) },
    { available: 4, booked: 6, total: 10, date: (new Date()).setDate((new Date()).getDate() + 2) },
    { available: 8, booked: 2, total: 10, date: (new Date()).setDate((new Date()).getDate() + 3) },
    { available: 1, booked: 9, total: 10, date: (new Date()).setDate((new Date()).getDate() + 4) },
  ];
  totalSelectedSlots = 0;
  carSlotsSelected = [];
  constructor() { }

  ngOnInit(): void {
    this.totalIcons();
  }
  openDate(date) {
    date.open();
  }
  updateSelections() {
    this.slots = this.slots.filter(d => d.date >= this.checkIn.value && d.date <= this.checkOut.value);
  }
  minusBooking(i) {
    const slot = this.slots[i];
    slot.available = slot.available + 1;
    this.slots[i] = slot;
    this.totalSelectedSlots = this.totalSelectedSlots - 1;
    this.totalIcons();
  }
  addBooking(i) {
    const slot = this.slots[i];
    slot.available = slot.available - 1;
    this.slots[i] = slot;
    this.totalSelectedSlots = this.totalSelectedSlots + 1;
    this.totalIcons();
  }
  private totalIcons() {
    this.carSlotsSelected = [];
    for (let i = 0; i < this.totalSelectedSlots; i++) {
      this.carSlotsSelected.push({});

    }
    return this.carSlotsSelected;
  }
}
