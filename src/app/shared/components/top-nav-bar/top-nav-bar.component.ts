import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ProgramsListService } from 'src/app/core/services/programs-list.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css'],
})
export class TopNavBarComponent implements OnInit {
  programs$: Observable<any[]>;
  @Input() currentUser: any;
  selectedForm: any;
  @Output() selectedProgramForm: EventEmitter<any> = new EventEmitter<any>();
  constructor(private programsListService: ProgramsListService) {}

  ngOnInit(): void {
    // this.selectedForm = {
    //   id: 'zRQV8FlMrIx',
    //   name: 'Data Verification Supervision',
    // };
    this.programs$ = this.programsListService.getProgramsList(['zRQV8FlMrIx']);
    this.programs$.subscribe((programsList) => {
      if (programsList) {
        this.selectedProgramForm.emit(programsList[0]);
      }
    });
  }

  onSetSelectedValue(event: MatSelectChange): void {
    this.selectedForm = event?.value;
    this.selectedProgramForm.emit(this.selectedForm);
  }
}
