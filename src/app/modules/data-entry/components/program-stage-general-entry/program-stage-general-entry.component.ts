import { Component, Input, OnInit } from '@angular/core';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { TextArea } from 'src/app/shared/modules/forms/models/text-area.model';
import { Textbox } from 'src/app/shared/modules/forms/models/text-box.model';

@Component({
  selector: 'app-program-stage-general-entry',
  templateUrl: './program-stage-general-entry.component.html',
  styleUrls: ['./program-stage-general-entry.component.css'],
})
export class ProgramStageGeneralEntryComponent implements OnInit {
  @Input() programStage: any;
  generalFormFields: any[];
  constructor() {}

  ngOnInit(): void {
    console.log(this.programStage);
    this.generalFormFields = this.programStage?.programStageDataElements
      ?.map((stageDataElement) => {
        return stageDataElement?.dataElement?.valueType === 'LONG_TEXT' &&
          !stageDataElement?.dataElement?.optionSetValue
          ? new TextArea({
              id: stageDataElement?.dataElement?.id,
              key: stageDataElement?.dataElement?.id,
              label: stageDataElement?.dataElement?.name,
              required: stageDataElement?.mandatory,
            })
          : null;
      })
      ?.filter((formField) => formField);
    console.log(this.generalFormFields);
  }

  onFormUpdate(formValue: FormValue): void {}
}
