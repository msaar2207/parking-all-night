import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
 //data:any;
 reservationId;
  constructor(private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
     this.reservationId = params.reservationId;
    });

  }

}
