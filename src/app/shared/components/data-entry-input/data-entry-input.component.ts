import { Component, Input, OnInit } from '@angular/core';
import { Textbox } from '../../modules/forms/models/text-box.model';
import { FormValue } from '../../modules/forms/models/form-value.model';

@Component({
  selector: 'app-data-entry-input',
  templateUrl: './data-entry-input.component.html',
  styleUrls: ['./data-entry-input.component.css'],
})
export class DataEntryInputComponent implements OnInit {
  @Input() elementId: string;
  @Input() period: any;
  @Input() width: string;
  formField: any;
  constructor() {}

  ngOnInit(): void {
    this.formField = new Textbox({
      id: this.elementId + '-' + this.period?.id,
      key: this.elementId + '-' + this.period?.id,
      label: '',
      type: 'number',
      min: 0,
    });
  }
  onFormUpdate(formValue: FormValue): void {
    console.log(formValue.getValues());
  }
}
