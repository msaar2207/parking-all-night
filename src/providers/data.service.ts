import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// tslint:disable: max-line-length
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }
  getFuelPrice(fuelType) {
    let headers = new HttpHeaders().set('x-rapidapi-host', 'gas-price.p.rapidapi.com');
    headers = headers.append('x-rapidapi-key', '02aeba3ac9mshd0084d97e707719p1e1bf4jsneba58768c549');
    return this._http.get(`http://devapi.mygasfeed.com/stations/radius/${environment.Latitude}/${environment.Longitude}/${environment.distance}/${fuelType}/price/${environment.GasAPI}`);
  }
  getByFilter(collection, filter, sort, skip, limit) {
    console.log(filter, sort, skip, limit);
    return this._http.get(`${environment.url}${collection}/find-${collection}`, {
      params: {
        filter: JSON.stringify(filter), sort: JSON.stringify(sort), skip, limit
      }
    });
  }
  createBooking(bookingObj) {
    return this._http.post(`${environment.url}bookings`, bookingObj);
  }
}
