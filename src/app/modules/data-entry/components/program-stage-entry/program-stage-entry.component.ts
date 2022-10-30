import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgramsListService } from 'src/app/core/services/programs-list.service';

@Component({
  selector: 'app-program-stage-entry',
  templateUrl: './program-stage-entry.component.html',
  styleUrls: ['./program-stage-entry.component.css'],
})
export class ProgramStageEntryComponent implements OnInit {
  @Input() programStage: any;
  programStage$: Observable<any>;
  constructor(private programsListService: ProgramsListService) {}

  ngOnInit(): void {
    this.programStage$ = this.programsListService.getProgramStageDetails(
      this.programStage?.id
    );
  }
}
