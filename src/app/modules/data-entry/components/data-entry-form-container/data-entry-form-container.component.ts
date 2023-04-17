import { Component, Input, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/core/services/data-service.service';
import { DateField } from 'src/app/shared/modules/forms/models/date-field.model';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { flatten } from 'lodash';

@Component({
  selector: 'app-data-entry-form-container',
  templateUrl: './data-entry-form-container.component.html',
  styleUrls: ['./data-entry-form-container.component.css'],
})
export class DataEntryFormContainerComponent implements OnInit {
  @Input() program: any;
  @Input() orgUnitId: string;
  @Input() programRules: any[];
  @Input() programRuleActions: any[];
  @Input() programRuleVariables: any[];
  reportFields: any[];
  isFormValid: boolean;
  supervisionDate: any;
  reportingDate: any;

  payloadsToSave: any[] = [];
  savingData: boolean = false;
  category: string;

  trackedEntityAttributeValues: any;
  capturedPayload: any = {};
  reviewedData: any = {};
  selectedPeriods: any[] = [];
  formData: any = {};
  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.category = 'LIST';
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
    this.programRuleVariables = this.program?.programRuleVariables;
  }

  onGetTrackedEntityAttributeValues(values: any): void {
    this.trackedEntityAttributeValues = Object.keys(values).map((key) => {
      return {
        attribute: key,
        value: values[key]?.value,
      };
    });
  }

  onFormUpdate(formValue: FormValue): void {
    // console.log(formValue.getValues());
    if (
      (this.supervisionDate || this.reportingDate) &&
      (this.supervisionDate != formValue.getValues()?.supervisionDate?.value ||
        this.reportingDate != formValue.getValues()?.reportingDate?.value)
    ) {
      this.supervisionDate = null;
      setTimeout(() => {
        this.supervisionDate = formValue.getValues()?.supervisionDate?.value;
        this.reportingDate = formValue.getValues()?.reportingDate?.value;
        this.isFormValid = formValue.isValid;
      }, 100);
    } else {
      this.supervisionDate = formValue.getValues()?.supervisionDate?.value;
      this.reportingDate = formValue.getValues()?.reportingDate?.value;
      this.isFormValid = formValue.isValid;
    }
  }

  onGetAllFormData(formData: any): void {
    this.formData = formData;
  }

  onCancel(event: Event): void {
    event.stopPropagation();
  }

  onSave(event: Event, payloadsToSave: any[]): void {
    event.stopPropagation();
    this.savingData = true;
    let payload = {
      ...this.payloadsToSave[0],
    };
    let enrollments = payload['enrollments'].map((enrollment) => {
      return {
        ...enrollment,
        events: flatten(
          this.payloadsToSave?.map((payloadToSave) => {
            return payloadToSave?.enrollments[0]?.events;
          })
        ),
      };
    });

    payload['enrollments'] = enrollments;
    // console.log('payload', payload);

    this.dataService
      .saveTrackedEntityInstance(payload)
      .subscribe((response) => {
        if (response) {
          this.savingData = false;
        }
      });
  }

  onGetPaperReviewedData(data: any): void {
    this.reviewedData = data;
  }

  onGetSelectedPeriods(periods: any): void {
    this.selectedPeriods = periods;
    // console.log(this.selectedPeriods);
  }

  onGetFormulatedPayload(payload: any): void {
    this.payloadsToSave = [];
    this.selectedPeriods.forEach((period) => {
      this.capturedPayload = { ...this.capturedPayload, ...payload };
      const enrollmentDetails = {
        trackedEntityType: this.program?.trackedEntityType?.id,
        orgUnit: this.orgUnitId,
        attributes: this.trackedEntityAttributeValues,
        enrollments: [
          {
            orgUnit: this.orgUnitId,
            program: this.program?.id,
            status: 'COMPLETED',
            enrollmentDate: this.reportingDate,
            incidentDate: this.supervisionDate,
            events: Object.keys(this.capturedPayload)?.map((programStage) => {
              return {
                program: this.program?.id,
                programStage: programStage,
                orgUnit: this.orgUnitId,
                eventDate: this.reportingDate,
                dataValues: [
                  ...(
                    this.capturedPayload[programStage]?.filter(
                      (dataValue) =>
                        dataValue?.id && dataValue?.id != 'undefined'
                    ) || []
                  ).map((valueData) => {
                    if (valueData?.id === period?.elementId) {
                      return {
                        dataElement: valueData?.id,
                        value: period?.valueKey,
                      };
                    } else {
                      return {
                        dataElement: valueData?.id,
                        value: valueData?.value,
                      };
                    }
                  }),
                  ...(Object.keys(this.reviewedData)
                    .map((key) => {
                      if (key?.indexOf(period?.valueKey) > -1) {
                        return {
                          dataElement: key.split('-')[0],
                          value: this.reviewedData[key]?.value,
                        };
                      }
                    })
                    ?.filter((dataValue) => dataValue) || []),
                ],
              };
            }),
          },
        ],
      };
      this.payloadsToSave = [...this.payloadsToSave, enrollmentDetails];
      // console.log('reviewedData', this.reviewedData);
      // console.log(this.payloadsToSave);
    });
  }

  onToggleCategory(event: Event, category: string): void {
    event.stopPropagation();
    this.category = category;
  }
}
