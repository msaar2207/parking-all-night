import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/pages/home/home.component';
import { HomeModule } from 'src/pages/home/home.module';
import { BookingComponent } from 'src/pages/booking/booking.component';
import { BookingModule } from 'src/pages/booking/booking.module';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking', loadChildren: () => import('../pages/booking/booking.module').then(m => m.BookingModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
