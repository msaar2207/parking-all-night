import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/pages/home/home.component';
import { HomeModule } from 'src/pages/home/home.module';


const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
