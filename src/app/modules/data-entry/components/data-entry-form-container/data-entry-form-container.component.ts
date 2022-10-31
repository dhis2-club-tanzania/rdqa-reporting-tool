import { Component, Input, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/core/services/data-service.service';
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

  payloadToSave: any;
  savingData: boolean = false;
  category: string;

  trackedEntityAttributeValues: any;
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
    this.supervisionDate = formValue.getValues()?.supervisionDate?.value;
    this.reportingDate = formValue.getValues()?.reportingDate?.value;
    this.isFormValid = formValue.isValid;
  }

  onCancel(event: Event): void {
    event.stopPropagation();
  }

  onSave(event: Event, data: any): void {
    event.stopPropagation();
    this.savingData = true;
    this.dataService.saveTrackedEntityInstance(data).subscribe((response) => {
      if (response) {
        this.savingData = false;
      }
    });
  }

  onGetFormulatedPayload(payload: any): void {
    console.log(
      'trackedEntityAttributeValues',
      this.trackedEntityAttributeValues
    );
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
          events: Object.keys(payload)?.map((programStage) => {
            return {
              program: this.program?.id,
              programStage: programStage,
              orgUnit: this.orgUnitId,
              eventDate: this.reportingDate,
              dataValues: payload[programStage].map((valueData) => {
                return {
                  dataElement: valueData?.id,
                  value: valueData?.value,
                };
              }),
            };
          }),
        },
      ],
    };
    this.payloadToSave = enrollmentDetails;
  }

  onToggleCategory(event: Event, category: string): void {
    event.stopPropagation();
    this.category = category;
  }
}
