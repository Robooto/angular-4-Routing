import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from "@angular/router";
import { ProductResolver } from "./product-resolver.service";
import { ProductEditInfoComponent } from "./product-edit-info.component";
import { ProductEditTagsComponent } from "./product-edit-tags.component";
import { AuthGuard } from "../user/auth-guard.service";
import { ProductEditGuard } from "./product-guard.service";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: ProductListComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { product: ProductResolver }
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        resolve: { product: ProductResolver },
        canDeactivate: [ProductEditGuard],
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ProductEditInfoComponent },
          { path: 'tags', component: ProductEditTagsComponent }
        ]
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  providers: [
    ProductService,
    ProductResolver,
    ProductEditGuard
  ]
})
export class ProductModule {}
