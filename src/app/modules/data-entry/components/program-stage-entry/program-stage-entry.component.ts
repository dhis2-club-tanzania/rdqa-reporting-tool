import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgramsListService } from 'src/app/core/services/programs-list.service';

import { uniqBy } from 'lodash';

@Component({
  selector: 'app-program-stage-entry',
  templateUrl: './program-stage-entry.component.html',
  styleUrls: ['./program-stage-entry.component.css'],
})
export class ProgramStageEntryComponent implements OnInit {
  @Input() programStage: any;
  @Input() supervisionDate: any;
  @Input() reportingDate: any;
  @Input() orgUnitId: string;
  programStage$: Observable<any>;
  requiredElements: any[] = [
    { id: 'AA4OYrWbh2U', name: 'Verification Level' },
    { id: 'TWEmGyCIJsq', name: 'Evaluated Quarter' },
  ];
  currentFormData: any = {};
  currentStageFormData: any = {};
  isVerificationFormReady: boolean = false;
  customFormData: any = [];
  period: string;
  shouldRerender: boolean = false;
  stageKeyedData: any = {};

  @Output() formulatedPayload: EventEmitter<any> = new EventEmitter<any>();
  constructor(private programsListService: ProgramsListService) {}

  ngOnInit(): void {
    this.programStage$ = this.programsListService.getProgramStageDetails(
      this.programStage?.id
    );
  }

  onCaptureData(dataDetails: any, programStage: any): void {
    const data = dataDetails?.data;
    this.currentStageFormData = { ...this.currentStageFormData, ...data };
    let requiredData = [];
    this.requiredElements?.map((elem) => {
      if (this.currentStageFormData[elem?.id]?.value !== '') {
        requiredData = [
          ...requiredData,
          {
            ...elem,
            value: this.currentStageFormData[elem?.id]?.value,
          },
        ];
      }
    });
    const changed =
      this.currentStageFormData['TWEmGyCIJsq']?.value &&
      this.period != this.currentStageFormData['TWEmGyCIJsq']?.value
        ? true
        : false;
    if (changed) {
      this.shouldRerender = false;
      setTimeout(() => {
        this.shouldRerender = true;
      }, 200);
    }
    this.period = this.currentStageFormData['TWEmGyCIJsq']?.value
      ? new Date(this.supervisionDate).getFullYear() +
        this.currentStageFormData['TWEmGyCIJsq']?.value
      : '';
    this.isVerificationFormReady = requiredData?.length >= 2;

    let dataItems = [];
    Object.keys(this.currentStageFormData).forEach((key) => {
      dataItems = [...dataItems, this.currentStageFormData[key]];
    });
    dataItems = dataItems?.map((data) => {
      return {
        ...data,
        id: data?.id?.split('-')[0],
      };
    });
    this.stageKeyedData[programStage?.id] = uniqBy(dataItems, 'id');
    this.formulatedPayload.emit(this.stageKeyedData);
  }

  onGetCustomFormDataValues(values: any, programStage: any): void {
    // console.log('currentFormData', this.currentFormData);
    this.currentFormData = { ...this.currentFormData, ...values };
    Object.keys(this.currentFormData).forEach((key) => {
      this.customFormData = [...this.customFormData, this.currentFormData[key]];
    });
    this.customFormData = this.customFormData?.map((data) => {
      return {
        ...data,
        id: data?.id?.split('-')[0],
      };
    });
    this.stageKeyedData[programStage?.id] = uniqBy(this.customFormData, 'id');
    this.formulatedPayload.emit(this.stageKeyedData);
  }
}
