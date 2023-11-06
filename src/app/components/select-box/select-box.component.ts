import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
})
export class SelectBoxComponent implements OnInit {
  @Input() currencies!: any;
  @Output() selectValueEmitter: EventEmitter<string> =
    new EventEmitter<string>();

  sendSelectInput(selectedValue: string): void {
    this.selectValueEmitter.emit(selectedValue);
  }
  currenciesLength: number = 0;

  ngOnInit(): void {
    this.currenciesLength = Object.keys(this.currencies).length;
  }
}
