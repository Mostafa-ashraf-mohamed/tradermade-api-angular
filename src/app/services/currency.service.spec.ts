import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';
describe('CurrencyService', () => {
  let injector: TestBed;
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService],
    });
    injector = getTestBed();

    service = injector.inject(CurrencyService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a correct list of currencies', () => {
    httpMock.verify();
    let mockResponse = { available_currencies: ['one', 'two', 'three'] };

    service.getAllCurrenciesList().subscribe((currencies) => {
      expect(currencies).toEqual(mockResponse.available_currencies);
    });

    const req = httpMock.expectOne(
      'https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=N3dQNjQN3LWaK3Km6GS4'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return a correct Timeseries Data', () => {
    httpMock.verify();
    let mockResponse = {
      base_currency: 'USA',
      end_date: '2023-05-01',
      endpoint: 'timeseries',
      quote_currency: 'EGP',
      quotes: [
        {
          close: 0.8852,
          date: '2023-01-03',
          high: 0.88725,
          low: 0.884,
          open: 0.88468,
        },
        {
          close: 0.88149,
          date: '2023-10-03',
          high: 0.88627,
          low: 0.87828,
          open: 0.88518,
        },
      ],
    };

    const param = {
      startDate: '2023-01-03',
      endDate: '2023-10-03',
      baseCurrency: 'USA',
      quoteCurrency: 'EGP',
    };
    service.getTimeseriesData(param).subscribe((data) => {
      expect(data).toEqual(mockResponse.quotes);
    });

    const req = httpMock.expectOne(
      'https://marketdata.tradermade.com/api/v1/timeseries?currency=USAEGP&start_date=2023-01-03&end_date=2023-10-03&api_key=N3dQNjQN3LWaK3Km6GS4'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
