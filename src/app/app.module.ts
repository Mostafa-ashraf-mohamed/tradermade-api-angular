import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SelectBoxComponent } from './components/select-box/select-box.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartDisplayComponent } from './components/chart-display/chart-display.component';

@NgModule({
  declarations: [AppComponent, SelectBoxComponent, ChartDisplayComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
