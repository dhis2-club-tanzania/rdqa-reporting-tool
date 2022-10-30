import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgramsListService } from 'src/app/core/services/programs-list.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
})
export class DataEntryComponent implements OnInit {
  program$: Observable<any>;
  programId: string;
  orgUnitId: string;
  constructor(
    private programService: ProgramsListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.programId = this.route?.snapshot?.params['program'];
    this.program$ = this.programService.getProgramDetailsById(
      this.programId,
      'id,name,sharing,displayEnrollmentDateLabel,programTrackedEntityAttributes[id,name,mandatory,valueType,trackedEntityAttribute[id,name,optionSets[id,name,options[id,name,code]]]],programIndicators[id,name,aggregationType,decimals],programType,displayIncidentDate,onlyEnrollOnce,programStages[id,name,programStageDataElements[id,dataElement[id,name,dataType]]]'
    );
  }
}
