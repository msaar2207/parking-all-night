import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'src/components/toolbar/toolbar.module';
import { FooterModule } from 'src/components/footer/footer.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataService } from 'src/providers/data.service';
import { HttpClientModule } from '@angular/common/http';
import { UtilsService } from 'src/providers/utils.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarModule,
    FooterModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [DataService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
