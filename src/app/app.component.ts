import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Forex Exchange';
  SendSelectValue1: string = '';
  SendSelectValue2: string = '';

  currencies$ = this.currencyService.getAllCurrenciesList().pipe(
    tap((res) => {
      this.SendSelectValue1 = Object.keys(res)[0];
      this.SendSelectValue2 = Object.keys(res)[0];
    })
  );

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {}

  receiveSelectValue1(selectValue: string): void {
    this.SendSelectValue1 = selectValue;
  }
  receiveSelectValue2(selectValue: string): void {
    this.SendSelectValue2 = selectValue;
  }
}
