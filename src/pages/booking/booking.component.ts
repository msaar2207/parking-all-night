import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingComponent implements OnInit, AfterViewInit {
  @ViewChild('tab', { static: false }) tabs: MatTabGroup;

  checkIn = new FormControl();
  checkOut = new FormControl();
  nowDate = new Date();
  slots = [
    { available: 7, booked: 3, total: 10, selected: 0, date: (new Date()).setDate((new Date()).getDate() + 1) },
    { available: 4, booked: 6, total: 10, selected: 0, date: (new Date()).setDate((new Date()).getDate() + 2) },
    { available: 8, booked: 2, total: 10, selected: 0, date: (new Date()).setDate((new Date()).getDate() + 3) },
    { available: 1, booked: 9, total: 10, selected: 0, date: (new Date()).setDate((new Date()).getDate() + 4) },
  ];
  carSlotsSelected = [];
  constructor(private _router: ActivatedRoute) { }

  ngOnInit(): void {
    this._router.queryParams.subscribe(qp => {
      this.checkIn.patchValue(new Date(qp.from));
      this.checkOut.patchValue(new Date(qp.to));
    });
  }
  ngAfterViewInit() {
    this.tabs.selectedIndex = 1;
  }
  openDate(date) {
    date.open();
  }
  updateSelections() {
    this.slots = this.slots.filter(d => d.date >= this.checkIn.value && d.date <= this.checkOut.value);
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
}
