import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from "./home/welcome.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { AuthGuard } from "./user/auth-guard.service";
import { SelectiveStrategy } from "./selective-strategy.service";

const routes: Routes = [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'products', data: { preload: true }, loadChildren: 'app/products/product.module#ProductModule', canActivate: [AuthGuard]},
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', component: PageNotFoundComponent }
    ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: SelectiveStrategy })
  ],
  providers: [SelectiveStrategy],
  exports: [RouterModule],
})
export class AppRoutingModule { }
