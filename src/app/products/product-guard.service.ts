import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ProductEditComponent } from "./product-edit.component";

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
    constructor() { }
    
    canDeactivate(component: ProductEditComponent, currentRoute: ActivatedRouteSnapshot): boolean  {
        if (component.isDirty) {
            let productName = component.product.productName || 'New Product';
            return confirm(`Navigate away and lose all changes to ${productName}?`);
        }
        return true;
    }
}