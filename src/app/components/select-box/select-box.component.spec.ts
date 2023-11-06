import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoxComponent } from './select-box.component';
import { By } from '@angular/platform-browser';

describe('SelectBoxComponent', () => {
  let component: SelectBoxComponent;
  let fixture: ComponentFixture<SelectBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBoxComponent],
    });
    fixture = TestBed.createComponent(SelectBoxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 3 option inside select', () => {
    component.currencies = {
      one: 'one number',
      two: 'two number',
      three: 'three number',
    };
    fixture.detectChanges();
    let selectOptions: any[] = fixture.debugElement.queryAll(By.css('option'));
    expect(selectOptions.length).toEqual(3);
  });

  it('should emit selected value', () => {
    component.currencies = {
      one: 'one number',
      two: 'two number',
      three: 'three number',
    };
    fixture.detectChanges();
    spyOn(component.selectValueEmitter, 'emit');
    let select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = 'one';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.selectValueEmitter.emit).toHaveBeenCalledWith('one');
  });

  it('should show alert when there is no currencies', () => {
    component.currencies = {};
    fixture.detectChanges();

    expect(component.currenciesLength).toEqual(0);
    expect(
      fixture.debugElement.query(By.css('.alert')).nativeElement
    ).toBeTruthy();
  });
});
