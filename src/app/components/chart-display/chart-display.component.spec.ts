import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartDisplayComponent } from './chart-display.component';
import { CurrencyService } from 'src/app/services/currency.service';
import { ChartDisplayService } from 'src/app/services/chart-display.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { IQuote, IRequestParameters } from 'src/app/models';
import { BrowserModule, By } from '@angular/platform-browser';
import {
  chartDisplayServiceMock,
  currencyServiceMock,
} from '../../utilities/shared-mocks';

describe('ChartDisplayComponent', () => {
  let component: ChartDisplayComponent;
  let fixture: ComponentFixture<ChartDisplayComponent>;
  let currencyService: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartDisplayComponent],
      imports: [BrowserModule, HttpClientModule],
      providers: [
        { provide: ChartDisplayService, useValue: chartDisplayServiceMock },
        { provide: CurrencyService, useValue: currencyServiceMock },
      ],
    });
    fixture = TestBed.createComponent(ChartDisplayComponent);
    currencyService = TestBed.inject(CurrencyService);
    component = fixture.componentInstance;
    component.baseCurrency = 'usa';
    component.quoteCurrency = 'egp';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process quote data correctly', () => {
    const inputData: IQuote[] = [
      { date: '2023-10-01', close: 100, high: 5, low: 6, open: 30 },
      { date: '2023-10-02', close: 120, high: 5, low: 6, open: 30 },
      { date: '2023-10-03', close: 90, high: 5, low: 6, open: 30 },
    ];

    const expectedResult = {
      dates: ['2023-10-01', '2023-10-02', '2023-10-03'],
      closes: [100, 120, 90],
      currentValue: 90,
      differenceValue: 10,
    };

    const result = component.processQuoteData(inputData);
    expect(result).toEqual(expectedResult);
  });

  it('should draw and process data correctly', () => {
    const mockTimeseriesData = [
      { date: '2023-10-01', close: 100 },
      { date: '2023-10-02', close: 120 },
      { date: '2023-10-03', close: 90 },
    ];

    spyOn(component, 'processQuoteData').and.returnValue({
      dates: ['2023-10-01', '2023-10-02', '2023-10-03'],
      closes: [100, 120, 90],
      currentValue: 90,
      differenceValue: 10,
    });

    currencyServiceMock.getTimeseriesData.and.returnValue(
      of(mockTimeseriesData)
    );

    const requestParameters: IRequestParameters = {
      startDate: '2023-09-01',
      endDate: '2023-10-03',
      baseCurrency: 'USD',
      quoteCurrency: 'EUR',
    };

    component.drawAndProcessData(requestParameters);

    expect(component.currentValue).toBe(90);
    expect(component.differenceValue).toBe(10);
    expect(component.isReload).toBe(true);
  });

  it('should set active interval correctly', () => {
    const interval = { label: '1M', value: 1 };
    component.setActive(interval);
    expect(component.activeInterval).toBe('1M');
  });

  it('should call dataMonth method when the interval is in months', () => {
    const interval = { label: '5M', value: 5 };
    spyOn(component, 'dataMonth');
    component.setActive(interval);
    expect(component.dataMonth).toHaveBeenCalledWith(5);
  });

  it('should call dataWeek method when the interval is in weeks', () => {
    const interval = { label: '1W', value: 7 };
    spyOn(component, 'dataWeek');
    component.setActive(interval);
    expect(component.dataWeek).toHaveBeenCalledWith(7);
  });

  it('should call dataDay method when the interval is in days', () => {
    const interval = { label: '1D', value: 1 };
    spyOn(component, 'dataDay');
    component.setActive(interval);
    expect(component.dataDay).toHaveBeenCalledWith(1);
  });

  describe('template rendering', () => {
    it('should render currency information correctly', () => {
      component.baseCurrency = 'USD';
      component.quoteCurrency = 'EUR';
      component.currentValue = 100;
      component.differenceValue = 10;

      fixture.detectChanges();

      const currencyInfoElement = fixture.debugElement.query(
        By.css('.currency-info')
      ).nativeElement;
      const flagsElement = fixture.debugElement.query(
        By.css('.flags')
      ).nativeElement;
      const h2Element = fixture.debugElement.query(By.css('h2')).nativeElement;
      const dataInfoElement = fixture.debugElement.query(
        By.css('.data-info')
      ).nativeElement;

      expect(currencyInfoElement).toBeTruthy();
      expect(flagsElement).toBeTruthy();
      expect(h2Element.textContent).toContain('USD/EUR');
      expect(h2Element.textContent).toContain('100');
      expect(dataInfoElement.textContent).toContain('10');
    });

    it('should render chart container correctly', () => {
      component.isReload = true;
      fixture.detectChanges();

      const chartContainerElement = fixture.debugElement.query(
        By.css('.chart-container')
      ).nativeElement;
      expect(chartContainerElement).toBeTruthy();
    });

    it('should render alert if currencies are the same', () => {
      component.baseCurrency = 'USD';
      component.quoteCurrency = 'USD';
      fixture.detectChanges();

      const alertElement = fixture.debugElement.query(
        By.css('.alert')
      ).nativeElement;
      expect(alertElement).toBeTruthy();
    });

    it('should not render alert if currencies are different', () => {
      component.baseCurrency = 'USD';
      component.quoteCurrency = 'EUR';
      fixture.detectChanges();

      const alertElement = fixture.debugElement.query(By.css('.alert'));
      expect(alertElement).toBeFalsy();
    });
  });
});
