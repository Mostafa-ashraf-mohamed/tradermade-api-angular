import {
  AfterViewInit,
  Component,
  DestroyRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import {
  ChartDisplayService,
  IDataset,
} from 'src/app/services/chart-display.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IQuote, IResponseFormat, IRequestParameters } from 'src/app/models';
import {
  getCurrentDate,
  getDateMonthsAgo,
  getDateWeeksAgo,
  getDateDaysAgo,
} from '../../utilities/dateFormat';
import { ChartItem } from 'chart.js';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.scss'],
  providers: [ChartDisplayService],
})
export class ChartDisplayComponent implements OnChanges, AfterViewInit {
  @Input() baseCurrency!: string;
  @Input() quoteCurrency!: string;

  currentValue: number = 0.0;
  differenceValue: number = 0.0;
  isReload: boolean = false;

  private destroyRef = inject(DestroyRef);

  constructor(
    private currencyService: CurrencyService,
    private ChartDisplayService: ChartDisplayService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['baseCurrency'] && !changes['baseCurrency'].firstChange) ||
      (changes['quoteCurrency'] && !changes['quoteCurrency'].firstChange)
    ) {
      if (this.baseCurrency != this.quoteCurrency) {
        let requestParameters: IRequestParameters = {
          startDate: getDateMonthsAgo(5),
          endDate: getCurrentDate(),
          baseCurrency: this.baseCurrency,
          quoteCurrency: this.quoteCurrency,
        };
        this.drawAndProcessData(requestParameters);
        this.activeInterval = '5M';
      }
    }
  }

  ngAfterViewInit() {
    const chartItem: ChartItem = document.getElementById(
      'my-chart'
    ) as ChartItem;

    this.ChartDisplayService.initializeChart(chartItem);
  }

  /*view button actions*/
  activeInterval: string = '5M';
  activeIntervals: { label: string; value: number }[] = [
    { label: '5M', value: 5 },
    { label: '3M', value: 3 },
    { label: '1M', value: 1 },
    { label: '1W', value: 7 },
    { label: '1D', value: 1 },
  ];

  setActive(interval: { label: string; value: number }): void {
    this.activeInterval = interval.label;
    if (interval.label.includes('M')) {
      this.dataMonth(interval.value);
    } else if (interval.label.includes('W')) {
      this.dataWeek(interval.value);
    } else if (interval.label.includes('D')) {
      this.dataDay(interval.value);
    }
  }

  dataMonth(months: number) {
    if (this.baseCurrency != this.quoteCurrency) {
      let requestParameters: IRequestParameters = {
        startDate: getDateMonthsAgo(months),
        endDate: getCurrentDate(),
        baseCurrency: this.baseCurrency,
        quoteCurrency: this.quoteCurrency,
      };
      this.drawAndProcessData(requestParameters);
    }
  }
  dataWeek(weeks: number) {
    if (this.baseCurrency != this.quoteCurrency) {
      let requestParameters: IRequestParameters = {
        startDate: getDateWeeksAgo(weeks),
        endDate: getCurrentDate(),
        baseCurrency: this.baseCurrency,
        quoteCurrency: this.quoteCurrency,
      };
      this.drawAndProcessData(requestParameters);
    }
  }
  dataDay(days: number) {
    if (this.baseCurrency != this.quoteCurrency) {
      let requestParameters: IRequestParameters = {
        startDate: getDateDaysAgo(days),
        endDate: getCurrentDate(),
        baseCurrency: this.baseCurrency,
        quoteCurrency: this.quoteCurrency,
      };
      this.drawAndProcessData(requestParameters);
    }
  }

  drawAndProcessData(requestParameters: IRequestParameters) {
    this.isReload = false;
    this.currencyService
      .getTimeseriesData(requestParameters)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((timeseriesData) => {
        const responseFormat: IResponseFormat =
          this.processQuoteData(timeseriesData);

        this.currentValue = responseFormat.currentValue;
        this.differenceValue = responseFormat.differenceValue;

        let closeData: IDataset[] = [
          {
            label: `${responseFormat.dates[0]} to ${
              responseFormat.dates[responseFormat.dates.length - 1]
            }`,
            data: responseFormat.closes,
            fill: true,
            borderColor: '#abd275',
            backgroundColor: '#f3f9eb',
            tension: 0,
            borderWidth: 2,
            pointRadius: 0,
          },
        ];
        this.isReload = this.ChartDisplayService.drawNewChart(
          responseFormat.dates,
          closeData
        );
      });
  }

  /*data processing*/
  processQuoteData(inputData: IQuote[]): IResponseFormat {
    return {
      dates: inputData.map((data) => data.date),
      closes: inputData.map((data) => data.close),
      currentValue: inputData[inputData.length - 1].close,
      differenceValue: Math.abs(
        inputData[0].close - inputData[inputData.length - 1].close
      ),
    };
  }
}
