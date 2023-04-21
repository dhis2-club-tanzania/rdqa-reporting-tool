import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { ProgramsListService } from 'src/app/core/services/programs-list.service';

import { uniqBy, keyBy } from 'lodash';
import { generatePeriodsFormDataVerificationPeriodTypeAndSupervisionDate } from 'src/app/core/helpers/date-formatting.helpers';
import { Dropdown } from 'src/app/shared/modules/forms/models/dropdown.model';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { DataServiceService } from 'src/app/core/services/data-service.service';
import {
  calculateVariance,
  differenceBetweenTwoNumbers,
} from 'src/app/core/helpers/maths-calculations.helper';

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
  @Input() programRules: any[];
  @Input() programRuleActions: any[];
  @Input() programRuleVariables: any[];
  @Input() programId: string;
  @Input() formData: any;
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
  periodsToFeedData = [];
  currentYear: number = new Date().getFullYear();
  yearlyFormField: any;
  dataDetails: any;
  indicatorsData: any = {};
  paperToolsData: any = {};

  @Output() formulatedPayload: EventEmitter<any> = new EventEmitter<any>();
  @Output() paperReviewedData: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedPeriods: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() allFormData: EventEmitter<any> = new EventEmitter<any>();
  sectionsToHide: any = {};
  optionsToHide: any = {};
  itemsToHide: any = {};
  constructor(
    private programsListService: ProgramsListService,
    private dataService: DataServiceService
  ) {}

  ngOnInit(): void {
    this.programStage$ = this.programsListService.getProgramStageDetails(
      this.programStage?.id
    );
    this.currentYear = new Date(this.supervisionDate).getFullYear();
    let years = [];
    for (let count = 0; count < 5; count++) {
      years = [...years, new Date().getFullYear() - count];
    }
    this.yearlyFormField = new Dropdown({
      id: 'year',
      key: 'year',
      label: 'Year',
      options:
        years.map((year) => {
          return {
            id: year,
            key: year,
            value: year,
            label: year,
          };
        }) || [],
    });
  }

  onFormUpdate(formValue: FormValue, programStage: any): void {
    this.currentYear = Number(formValue.getValues()?.year?.value);
    this.onCaptureData(this.dataDetails, programStage);
  }

  onCaptureData(dataDetails: any, programStage: any): void {
    this.dataDetails = dataDetails;
    const data = dataDetails?.data;
    // console.log('BGY2qYFRNdj', dataDetails);
    if (dataDetails?.data['BGY2qYFRNdj'] && dataDetails?.data['TWEmGyCIJsq']) {
      this.periodsToFeedData = [];
      setTimeout(() => {
        const periods =
          generatePeriodsFormDataVerificationPeriodTypeAndSupervisionDate(
            dataDetails?.data['BGY2qYFRNdj']?.value,
            dataDetails?.data['TWEmGyCIJsq']?.value,
            this.supervisionDate,
            this.currentYear,
            'TWEmGyCIJsq'
          );
        // console.log('periods', periods);
        this.periodsToFeedData = periods;
        this.selectedPeriods.emit(periods);
        this.getDataForEachIndicatorForSelectedPeriods(
          periods,
          programStage?.programStageDataElements?.map(
            (programStageDataElement) => programStageDataElement?.dataElement
          )
        );
      }, 50);
    }
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
    this.formData[programStage?.id] = this.currentStageFormData;
    this.allFormData.emit(this.formData);
    this.formulatedPayload.emit(this.stageKeyedData);
  }

  onGetProgramRulesActionsResults(programRuleActions: any): void {
    // console.log('programRuleActions', programRuleActions);
    this.itemsToHide = {
      ...this.itemsToHide,
      ...keyBy(
        (
          programRuleActions?.filter(
            (programRuleAction) =>
              programRuleAction?.programRuleActionType === 'HIDESECTION'
          ) || []
        )?.map((programRuleAction: any) => {
          return {
            ...programRuleAction,
            programStageSectionId: programRuleAction?.programStageSection?.id,
          };
        }),
        'programStageSectionId'
      ),
    };

    this.itemsToHide = {
      ...this.itemsToHide,
      ...keyBy(
        (
          programRuleActions?.filter(
            (programRuleAction) =>
              programRuleAction?.programRuleActionType === 'HIDEOPTION'
          ) || []
        )?.map((programRuleAction: any) => {
          return {
            ...programRuleAction,
            optionId: programRuleAction?.option?.id,
          };
        }),
        'optionId'
      ),
    };

    // console.log('itemsToHide', this.itemsToHide);
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

  getDataForEachIndicatorForSelectedPeriods(
    periods: any[],
    dataElements: any[]
  ): void {
    const indicators = dataElements?.map((element) => {
      return {
        ...element,
        elementId: element?.id,
        indicatorId: (element?.attributeValues?.filter(
          (attributeValue) => attributeValue?.attribute?.id === 'B5uRdqhgMQQ'
        ) || [])[0]?.value,
      };
    });
    const elementsKeyedByIndicator = keyBy(indicators, 'indicatorId');
    // console.log(indicators);
    zip(
      ...periods.map((pe) =>
        this.dataService.getAnalyticsData(
          indicators?.map((ind) => ind?.indicatorId) || [],
          pe?.id,
          this.orgUnitId
        )
      )
    ).subscribe((dataResponse) => {
      dataResponse?.forEach((response) => {
        if (response?.rows?.length > 0) {
          response?.rows?.forEach((row) => {
            this.indicatorsData[
              elementsKeyedByIndicator[row[0]].elementId + '-' + row[1]
            ] = {
              value: row[3],
              indicatorId: row[0],
              dataElement: elementsKeyedByIndicator[row[0]],
            };
          });
        }
      });
    });
  }

  getData(
    event: Event,
    elementId: string,
    period: any,
    indicatorsData: any
  ): void {
    const key = elementId + '-' + period?.id;
    const val = (event?.target as HTMLInputElement)?.value;
    this.paperToolsData[key] = {
      value: val,
      elementId: elementId,
      period,
    };
    this.paperReviewedData.emit(this.paperToolsData);
    this.formulatedPayload.emit(this.stageKeyedData);
    Object.keys(this.paperToolsData).forEach((key) => {
      const numbers = [
        Number(indicatorsData[key]?.value),
        Number(this.paperToolsData[key]?.value),
      ];
      const yesNoElem = document.getElementById(key + 'yes-no');
      if (
        Number(indicatorsData[key]?.value) ===
        Number(this.paperToolsData[key]?.value)
      ) {
        if (yesNoElem) {
          yesNoElem.innerText = 'Y';
        } else {
          yesNoElem.innerText = '';
        }
      } else {
        if (yesNoElem) {
          yesNoElem.innerText = 'N';
        } else {
          yesNoElem.innerText = '';
        }
      }

      const variance = differenceBetweenTwoNumbers(numbers);

      const varianceElem = document.getElementById(key + 'variance');
      if (varianceElem) {
        varianceElem.innerText = !isNaN(variance) ? variance.toString() : '-';
      } else {
        varianceElem.innerText = '';
      }
    });
  }
}
