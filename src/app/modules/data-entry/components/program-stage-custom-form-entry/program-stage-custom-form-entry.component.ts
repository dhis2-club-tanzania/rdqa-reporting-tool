import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-stage-custom-form-entry',
  templateUrl: './program-stage-custom-form-entry.component.html',
  styleUrls: ['./program-stage-custom-form-entry.component.css'],
})
export class ProgramStageCustomFormEntryComponent implements OnInit {
  @Input() dataEntryForm: any;
  @Input() programStageDataElements: any[];
  dataElements: any[] = [];
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

  onCustomFormInputChange(event): void {
    console.log(event);
  }
}
