import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/core/services/data-service.service';

@Component({
  selector: 'app-program-events-data',
  templateUrl: './program-events-data.component.html',
  styleUrls: ['./program-events-data.component.css'],
})
export class ProgramEventsDataComponent implements OnInit {
  @Input() programId: string;
  @Input() orgUnitId: string;
  trackedEntityInstances$: Observable<any[]>;
  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.trackedEntityInstances$ = this.dataService.getTrackedEntityInstances({
      ou: this.orgUnitId,
      program: this.programId,
    });
  }

  onEdit(event: Event, dataRow: any): void {
    event.stopPropagation();
    console.log(dataRow);
  }

  onDelete(event: Event, dataRow: any): void {
    event.stopPropagation();
    console.log(dataRow);
  }
}
