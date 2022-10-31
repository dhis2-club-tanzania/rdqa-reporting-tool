import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-aggregate-custom-form-entry',
  templateUrl: './aggregate-custom-form-entry.component.html',
  styleUrls: ['./aggregate-custom-form-entry.component.css'],
})
export class AggregateCustomFormEntryComponent implements OnInit {
  @Input() dataEntryForm: any;
  @Input() dataElements: any[];
  @Input() keyedDataValues: any;
  @Input() orgUnitId: string;
  @Input() period: string;
  statusArr: any[] = [];
  statusUpdateOnDomElement = {
    colorKey: 'WAIT',
    domElementId: 'VdOajI8PwGd-RXDbRXHscFp-val',
    id: 'RXDbRXHscFp-dataElement',
    status: 'not-synced',
    value: '333',
  };
  customFormDataValues = {};
  @Output() enteredDataValues = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    console.log('INSIDE');
    this.customFormDataValues = {
      ...this.customFormDataValues,
      ...this.keyedDataValues,
    };
    console.log('keyedDataValues', this.keyedDataValues);
    console.log('customFormDataValues', this.customFormDataValues);
  }

  detailsOfTheChangedValue(data) {
    const domElementId = data.domElementId;
    this.statusUpdateOnDomElement.domElementId = data.domElementId;
    this.statusUpdateOnDomElement.id = data.id;
    this.statusUpdateOnDomElement.colorKey = 'OK';
    this.statusUpdateOnDomElement.status = 'synched';
    this.statusUpdateOnDomElement.value = data.value;
    let dataObject = {};
    dataObject[data?.id] = data;
    this.customFormDataValues = {
      ...this.customFormDataValues,
      ...dataObject,
    };
    this.statusArr.push(this.statusUpdateOnDomElement);
    this.enteredDataValues.emit(this.customFormDataValues);
  }
}
