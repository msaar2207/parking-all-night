import { Component } from '@angular/core';
import { UtilsService } from 'src/providers/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean;
  constructor(private utilService: UtilsService) {
    this.utilService._loading.subscribe(val => this.loading = val);
  }
}
