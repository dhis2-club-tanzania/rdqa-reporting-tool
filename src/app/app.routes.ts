import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'data-entry',
    pathMatch: 'full',
  },
  {
    path: 'data-entry',
    loadChildren: () =>
      import('./modules/data-entry/data-entry-module').then(
        (m) => m.DataEntryModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
