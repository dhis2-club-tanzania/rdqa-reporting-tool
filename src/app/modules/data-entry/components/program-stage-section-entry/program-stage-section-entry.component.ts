import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  OptionSets,
  ProgramRuleAction,
  executeWithAction,
} from '@iapps/dhis2-program-rule-engine';
import { keyBy } from 'lodash';
import { Dropdown } from 'src/app/shared/modules/forms/models/dropdown.model';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { TextArea } from 'src/app/shared/modules/forms/models/text-area.model';
import { Textbox } from 'src/app/shared/modules/forms/models/text-box.model';

@Component({
  selector: 'app-program-stage-section-entry',
  templateUrl: './program-stage-section-entry.component.html',
  styleUrls: ['./program-stage-section-entry.component.css'],
})
export class ProgramStageSectionEntryComponent implements OnInit {
  @Input() programStage: any;
  @Input() programStageSection: any;
  @Input() currentFormData: any;
  @Input() programRules: any[];
  @Input() programRuleActions: any[];
  @Input() programRuleVariables: any[];
  @Input() programId: string;
  @Input() itemsToHide: any;
  sectionElementsFields: any[];
  @Output() capturedData: EventEmitter<any> = new EventEmitter<any>();
  @Output() programRulesActionsResults: EventEmitter<any> =
    new EventEmitter<any>();
  optionSets: OptionSets = {};
  dataElementsObject: any = {};
  constructor() {}

  ngOnInit(): void {
    // TODO: Add support to set mandatory fields
    console.log('currentFormData', this.currentFormData);
    this.dataElementsObject = keyBy(
      this.programStageSection?.dataElements,
      'id'
    );
    this.optionSets = keyBy(
      this.programStageSection?.dataElements?.map((dataElement: any) => {
        return {
          ...dataElement?.optionSet,
        };
      }) || []
    );
    this.sectionElementsFields = this.programStageSection?.dataElements
      ?.map((element: any) => {
        return element?.valueType == 'TEXT' && !element?.optionSetValue
          ? new Textbox({
              id: element?.id,
              key: element?.id,
              value: this.currentFormData[element?.id]?.value,
              label: element?.name,
            })
          : element?.optionSetValue
          ? new Dropdown({
              id: element?.id,
              key: element?.id,
              label: element?.name,
              value: this.currentFormData[element?.id]?.value,
              required: true,
              options: (
                element?.optionSet?.options?.filter(
                  (option: any) => !this.itemsToHide[option?.id]
                ) || []
              )?.map((option) => {
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
              value: this.currentFormData[element?.id]?.value,
              min: 0,
              type: 'number',
            })
          : element?.valueType === 'LONG_TEXT'
          ? new TextArea({
              id: element?.id,
              key: element?.id,
              value: this.currentFormData[element?.id]?.value,
              label: element?.name,
            })
          : null;
      })
      ?.filter((formField) => formField);
  }

  onFormUpdate(formValue: FormValue): void {
    this.currentFormData = {
      ...this.currentFormData,
      ...formValue.getValues(),
    };
    const eventWithValues = {
      program: this.programId,
      status: 'ACTIVE',
      programStage: this.programStage?.id,
      dataValues:
        (
          Object.keys(this.currentFormData).map((key) => {
            if (this.currentFormData[key]?.value) {
              return {
                dataElement: key,
                value: this.currentFormData[key]?.value,
              };
            }
          }) || []
        )?.filter((dataValue) => dataValue) || [],
    };
    // console.log('eventWithValues', eventWithValues);
    let results: ProgramRuleAction[] = executeWithAction(
      eventWithValues,
      this.dataElementsObject,
      this.programRules,
      this.programRuleVariables || [],
      this.programRuleActions,
      this.optionSets
    );

    // console.log('results', results);
    this.programRulesActionsResults.emit(null);
    this.capturedData.emit({
      stage: this.programStage,
      data: this.currentFormData,
    });
  }
}
