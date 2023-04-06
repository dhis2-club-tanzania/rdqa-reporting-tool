import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { sharedComponents } from './components';
import { modules } from './modules';
import { materialModules } from './materials-modules';

@NgModule({
  imports: [
    CommonModule,
    ...materialModules,
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2DataFilterModule,
    NgxDhis2PeriodFilterModule,
    ...modules,
  ],
  exports: [
    ...sharedComponents,
    ...materialModules,
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2DataFilterModule,
    NgxDhis2PeriodFilterModule,
    ...modules,
  ],
  declarations: [...sharedComponents],
})
export class SharedModule {}
