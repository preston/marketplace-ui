import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';
import {ProductService} from '../product/product.service';

import {Product} from "../product/product";
import {Build} from "../build/build";

@Injectable()
export class BuildService extends BaseService {

    public static PATH: string = '/builds';

    constructor(private productService: ProductService, backendService: BackendService, http: HttpClient) {
        super(backendService, http);
    }

    url(product: Product): string {
        return this.productService.url() + '/' + product.id + BuildService.PATH;
    }

    index(product: Product) {
        let builds = this.http.get<Build>(this.url(product), {headers: this.headers()}).pipe(map(res => res));
        return builds;
    }

	create(product: Product, build: Build) {
        let obs = this.http.post<Build>(this.url(product), { 'build': build }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}

	update(product: Product, build: Build) {
		let obs = this.http.put<Build>(this.url(product) + '/' + build.id, { 'build': build }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}

	delete(product: Product, build: Build) {
		let obs = this.http.delete<Build>(this.url(product) + '/' + build.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}
}
