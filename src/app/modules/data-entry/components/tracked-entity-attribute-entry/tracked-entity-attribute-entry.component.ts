import { Component, Input, OnInit } from '@angular/core';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { Textbox } from 'src/app/shared/modules/forms/models/text-box.model';

@Component({
  selector: 'app-tracked-entity-attribute-entry',
  templateUrl: './tracked-entity-attribute-entry.component.html',
  styleUrls: ['./tracked-entity-attribute-entry.component.css'],
})
export class TrackedEntityAttributeEntryComponent implements OnInit {
  @Input() programTrackedEntityAttributes: any;
  programTrackedEntityAttributesFields: any[];
  constructor() {}

  ngOnInit(): void {
    console.log(
      'programTrackedEntityAttributes',
      this.programTrackedEntityAttributes
    );
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
    // console.log(formValues.getValues());
  }
}
