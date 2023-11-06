import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CurrencyService } from './services/currency.service';
import { of } from 'rxjs';
import { SelectBoxComponent } from './components/select-box/select-box.component';
import { ChartDisplayComponent } from './components/chart-display/chart-display.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let currencyService: CurrencyService;

  const mockCurrencies = [
    { code: 'USD', name: 'United States Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound Sterling' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SelectBoxComponent, ChartDisplayComponent],
      providers: [
        {
          provide: CurrencyService,
          useValue: {
            getAllCurrenciesList: () => of(mockCurrencies),
          },
        },
      ],
      //   schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive and set the select value correctly', () => {
    const testValue1 = 'EUR';
    const testValue2 = 'EGP';
    component.receiveSelectValue1(testValue1);
    component.receiveSelectValue2(testValue2);
    expect(component.SendSelectValue1).toEqual(testValue1);
    expect(component.SendSelectValue2).toEqual(testValue2);
  });

  it('should handle select value from app-select-box', () => {
    const selectBoxComponent = fixture.debugElement.query(
      By.directive(SelectBoxComponent)
    );

    const selectValue = 'EGP';
    spyOn(component, 'receiveSelectValue1');
    selectBoxComponent.componentInstance.selectValueEmitter.emit(selectValue);
    fixture.detectChanges();

    expect(component.receiveSelectValue1).toHaveBeenCalledWith(selectValue);
  });

  describe('temple rendering', () => {
    it('should render the header', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('header').textContent).toContain(
        'check out the current price for a currency pair'
      );
    });

    it('should render h1 with text Forex Exchange', () => {
      const title = fixture.nativeElement.querySelector('h1');
      expect(title.textContent).toContain('Forex Exchange');
    });
  });
});
