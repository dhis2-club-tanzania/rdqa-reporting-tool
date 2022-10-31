import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-program-stage-custom-form-entry',
  templateUrl: './program-stage-custom-form-entry.component.html',
  styleUrls: ['./program-stage-custom-form-entry.component.css'],
})
export class ProgramStageCustomFormEntryComponent implements OnInit {
  @Input() dataEntryForm: any;
  @Input() programStageDataElements: any[];
  @Input() data: any;
  @Input() orgUnitId: string;
  @Input() period: string;
  dataElements: any[] = [];
  keyedDataValues: any = {};
  @Output() customFormDataValues: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    this.dataElements = this.programStageDataElements?.map(
      (programStageDataElement) => {
        return {
          ...programStageDataElement?.dataElement,
          required: programStageDataElement?.mandatory,
        };
      }
    );
  }

  getEnteredDataValues(values): void {
    this.keyedDataValues = { ...this.keyedDataValues, ...values };
    console.log(this.keyedDataValues);
    this.customFormDataValues.emit(this.keyedDataValues);
  }
}
