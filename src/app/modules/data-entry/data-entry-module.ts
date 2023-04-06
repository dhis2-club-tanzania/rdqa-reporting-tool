import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { entryPages } from './pages';
import { DataEntryRoutingModule } from './data-entry-routing.module';
import { components } from './components';

@NgModule({
  declarations: [...entryPages, ...components],
  imports: [CommonModule, SharedModule, DataEntryRoutingModule],
})
export class DataEntryModule {}
