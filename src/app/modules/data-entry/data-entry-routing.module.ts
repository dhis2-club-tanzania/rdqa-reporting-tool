import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataEntryHomeComponent } from './pages/data-entry-home/data-entry-home.component';

const routes: Routes = [
  {
    path: '',
    component: DataEntryHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataEntryRoutingModule {}
