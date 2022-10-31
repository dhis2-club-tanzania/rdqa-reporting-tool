import { Component, Input, OnInit } from '@angular/core';
import { DateField } from 'src/app/shared/modules/forms/models/date-field.model';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';

@Component({
  selector: 'app-data-entry-form-container',
  templateUrl: './data-entry-form-container.component.html',
  styleUrls: ['./data-entry-form-container.component.css'],
})
export class DataEntryFormContainerComponent implements OnInit {
  @Input() program: any;
  @Input() orgUnitId: string;
  reportFields: any[];
  isFormValid: boolean;
  supervisionDate: any;
  reportingDate: any;
  constructor() {}

  ngOnInit(): void {
    this.reportFields = [
      new DateField({
        id: 'supervisionDate',
        key: 'supervisionDate',
        label: 'Supervision Date',
        required: true,
        max: new Date(),
      }),
      new DateField({
        id: 'reportingDate',
        key: 'reportingDate',
        label: 'Reporting Date',
        required: true,
        max: new Date(),
      }),
    ];
  }

  onFormUpdate(formValue: FormValue): void {
    // console.log(formValue.getValues());
    this.supervisionDate = formValue.getValues()?.supervisionDate?.value;
    this.reportingDate = formValue.getValues()?.reportingDate?.value;
    this.isFormValid = formValue.isValid;
  }
}
