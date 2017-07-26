
Activating Child Routes

### Absolute Path
<a [routerLink]="['/products', product.id, 'edit', 'info']">Info</a>

this.router.navigate(['/products', this.product.id, 'edit', 'info']);

### Relative path
<a [routerLink]="['info']">Info</a>

this.router.navigate(['info'], { relativeTo: this.route});


Adding a '/' to the front makes the route absolute


Grouping routes need to have router outlets unless you use component less routes


RouterModule.forRoot(routes, {enableTracing: true}) add that to see the router events


## Lazy Loading

Use the canLoad guard when doing lazy loading items.  This guard stops downloading untill it passes!
canLoad gulard blocks preloading - makes sense
canActivate does not block preloading

### Preloading
Can eager lazy load modules - depends on the usage of the module
If used alot eager load it, if not just lazy load it

      RouterModule.forRoot(routes, {enableTracing: true, preloadingStrategy: PreloadAllModules})

### Preloading Strats

create your own stragey pretty simple to implement

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class SelectiveStrategy implements PreloadingStrategy {
    constructor() { }
    
    preload(route: Route, load: Function): Observable<any> {
        if (route.data && route.data['preload']) {
            return load();
        }
        return Observable.of(null);
    }
}

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