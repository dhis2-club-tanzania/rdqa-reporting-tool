import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProgramsListService } from 'src/app/core/services/programs-list.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
})
export class DataEntryComponent implements OnInit {
  program$: Observable<any>;
  programRules$: Observable<any[]>;
  programRuleActions$: Observable<any[]>;
  programId: string;
  orgUnitId: string;
  constructor(
    private programService: ProgramsListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orgUnitId = this.route?.snapshot?.params['ou'];
    this.programId = this.route?.snapshot?.params['program'];
    this.program$ = this.programService.getProgramDetailsById(
      this.programId,
      'id,name,sharing,trackedEntityType[id,name],displayEnrollmentDateLabel,' +
        'programTrackedEntityAttributes[id,name,mandatory,valueType,' +
        'trackedEntityAttribute[id,name,optionSets[id,name,options[id,name,code]]]],' +
        'programIndicators[id,name,aggregationType,decimals],programType,' +
        'displayIncidentDate,onlyEnrollOnce,programStages[id,name,programStageDataElements[id,dataElement[id,name,aggregationType,displayName,shortName,valueType,optionSetValue,optionSet,dataType,attributeValues]]],' +
        'selectIncidentDatesInFuture,incidentDateLabel,displayIncidentDate,programRuleVariables[*]'
    );
    this.programRules$ = this.programService
      .getProgramRules(
        `programRules.json?filter=program.id:eq:${this.programId}&fields=*,programRuleActions[*]&paging=false`
      )
      .pipe(map((response: any) => response?.programRules));
    this.programRuleActions$ = this.programService
      .getProgramRuleActions(
        `programRuleActions.json?fields=*,programRule[*]&filter=programRule.program.id:in:[zRQV8FlMrIx]`
      )
      .pipe(map((response: any) => response?.programRuleActions));
  }
}
