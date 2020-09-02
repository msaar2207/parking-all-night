import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  _loading = new BehaviorSubject(false);
  constructor() { }

  public set loading(val) {
    this._loading.next(val);
  }

  public get loading() {
    return this._loading.value;
  }
}
