import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './app/products/product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.product = this.route.snapshot.data['product'];
    }

}
