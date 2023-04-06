import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataEntryHomeComponent } from './pages/data-entry-home/data-entry-home.component';
import { DataEntryComponent } from './pages/data-entry/data-entry.component';

const routes: Routes = [
  {
    path: '',
    component: DataEntryHomeComponent,
  },
  {
    path: ':program/:ou',
    component: DataEntryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataEntryRoutingModule {}
