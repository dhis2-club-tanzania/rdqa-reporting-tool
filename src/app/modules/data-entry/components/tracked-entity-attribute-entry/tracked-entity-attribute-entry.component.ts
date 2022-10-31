import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { Textbox } from 'src/app/shared/modules/forms/models/text-box.model';

@Component({
  selector: 'app-tracked-entity-attribute-entry',
  templateUrl: './tracked-entity-attribute-entry.component.html',
  styleUrls: ['./tracked-entity-attribute-entry.component.css'],
})
export class TrackedEntityAttributeEntryComponent implements OnInit {
  @Input() programTrackedEntityAttributes: any;
  @Input() orgUnitId: string;
  programTrackedEntityAttributesFields: any[];

  @Output() trackedEntityAttributeValues: EventEmitter<any> =
    new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    this.programTrackedEntityAttributesFields =
      this.programTrackedEntityAttributes?.map((attribute) => {
        return new Textbox({
          id: attribute?.trackedEntityAttribute?.id,
          key: attribute?.trackedEntityAttribute?.id,
          label: attribute?.trackedEntityAttribute?.name,
          required: attribute?.mandatory,
        });
      });
  }

  onFormUpdate(formValues: FormValue): void {
    this.trackedEntityAttributeValues.emit(formValues.getValues());
  }
}
