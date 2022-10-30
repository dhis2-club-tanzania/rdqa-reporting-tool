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
  supervisionDateField: any;
  constructor() {}

  ngOnInit(): void {
    this.supervisionDateField = new DateField({
      id: 'supervisionDate',
      key: 'supervisionDate',
      label: 'Supervision Date',
      max: new Date(),
    });
  }

  onFormUpdate(formValue: FormValue): void {
    // console.log(formValue.getValues());
  }
}
