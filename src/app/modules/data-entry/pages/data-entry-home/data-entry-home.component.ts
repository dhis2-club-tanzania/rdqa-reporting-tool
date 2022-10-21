import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers';
import { getCurrentUser } from 'src/app/store/selectors';

@Component({
  selector: 'app-data-entry-home',
  templateUrl: './data-entry-home.component.html',
  styleUrls: ['./data-entry-home.component.css'],
})
export class DataEntryHomeComponent implements OnInit {
  orgUnitFilterConfig: OrgUnitFilterConfig = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false,
    reportUse: false,
    additionalQueryFields: [],
    batchSize: 400,
    closeOnDestroy: false,
    emitOnSelection: false,
    hideActionButtons: false,
  };
  showOuFilter: boolean = false;
  currentUser$: Observable<any>;

  selectedOrgUnitItems: any[];
  selectedProgram: any;
  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(getCurrentUser);
  }

  onToggleOuFilter(event: Event): void {
    event.stopPropagation();
    this.showOuFilter = !this.showOuFilter;
  }

  onOrgUnitUpdate(selection: any, action?: string): void {
    if (action === 'CLOSE') {
      this.selectedOrgUnitItems = null;
      this.showOuFilter = !this.showOuFilter;
    } else {
      this.selectedOrgUnitItems = selection?.items;
      this.showOuFilter = !this.showOuFilter;
      if (this.selectedProgram?.id) {
        this.router.navigate([
          'data-entry/' +
            this.selectedProgram?.id +
            '/' +
            this.selectedOrgUnitItems[0]?.id,
        ]);
      }
    }
  }

  onGetSelectedProgramForm(selectedProgram: any): void {
    console.log(selectedProgram);
    this.selectedProgram = selectedProgram;
  }
}
