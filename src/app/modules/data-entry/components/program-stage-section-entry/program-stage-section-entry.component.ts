import { Component, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Dropdown } from 'src/app/shared/modules/forms/models/dropdown.model';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { Textbox } from 'src/app/shared/modules/forms/models/text-box.model';

@Component({
  selector: 'app-program-stage-section-entry',
  templateUrl: './program-stage-section-entry.component.html',
  styleUrls: ['./program-stage-section-entry.component.css'],
})
export class ProgramStageSectionEntryComponent implements OnInit {
  @Input() programStageSection: any;
  sectionElementsFields: any[];
  constructor() {}

  ngOnInit(): void {
    console.log('ELEM', this.programStageSection?.dataElements);
    this.sectionElementsFields = this.programStageSection?.dataElements
      ?.map((element: any) => {
        return element?.valueType == 'TEXT' && !element?.optionSetValue
          ? new Textbox({
              id: element?.id,
              key: element?.id,
              label: element?.name,
            })
          : element?.optionSetValue
          ? new Dropdown({
              id: element?.id,
              key: element?.id,
              label: element?.name,
              options: element?.optionSet?.options?.map((option) => {
                return {
                  value: option?.code,
                  name: option?.name,
                  label: option?.name,
                  key: option?.code,
                };
              }),
            })
          : element?.valueType === 'INTEGER_ZERO_OR_POSITIVE'
          ? new Textbox({
              id: element?.id,
              key: element?.id,
              label: element?.name,
              min: 0,
              type: 'number',
            })
          : null;
      })
      ?.filter((formField) => formField);
  }

  onFormUpdate(formValue: FormValue): void {
    // console.log(formValue.getValues());
  }
}
