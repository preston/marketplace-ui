import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';
import {Product} from '../product/product';
import {License} from '../license/license';
import {User} from '../user/user';

@Injectable()
export class ProductService extends BaseService {

    public static PATH: string = '/products';
    public static SEARCH_PATH: string = '/products/search';

    constructor(backendService: BackendService, http: HttpClient) {
        super(backendService, http);
    }

    url(): string {
        return this.backendService.url + ProductService.PATH;
    }

    searchUrl(): string {
        return this.backendService.url + ProductService.SEARCH_PATH;
    }

    search(text: string) {
        let products = this.http.post<Product[]>(this.searchUrl(), { text: text }, {headers: this.headers()}).pipe(map(res => res));
        return products;
    }

    searchPublished(text: string) {
        let products = this.http.post<Product[]>(this.searchUrl() + '?published=true', { text: text }, {headers: this.headers()}).pipe(map(res => res));
        return products;
    }

    searchUnpublished(text: string) {
        let products = this.http.post<Product[]>(this.searchUrl() + '?published=false', { text: text }, {headers: this.headers()}).pipe(map(res => res));
        return products;
    }

	index() {
        let products = this.http.get<Product[]>(this.url(), {headers: this.headers()}).pipe(map(res => res));
        return products;
    }

	indexByLicense(license: License) {
        let products = this.http.get<Product[]>(this.url() + '?license_id=' + license.id , {headers: this.headers()}).pipe(map(res => res));
        return products;
    }

	indexByUser(user: User) {
        let products = this.http.get<Product[]>(this.url() + '?user_id=' + user.id , {headers: this.headers()}).pipe(map(res => res));
        return products;
    }

    published() {
        let products = this.http.get<Product[]>(this.url() + '?published=true', {headers: this.headers()}).pipe(map(res => res));
        return products;
    }

    unpublished() {
        let products = this.http.get<Product[]>(this.url() + '?published=false', {headers: this.headers()}).pipe(map(res => res));
        return products;
    }

    get(id: string) {
        let service = this.http.get<Product>(this.url() + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return service;
    }

    create(product: Product) {
        let obs = this.http.post<Product>(this.url(), { 'product': product }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    update(product: Product) {
        let obs = this.http.put<Product>(this.url() + '/' + product.id, { 'product': product }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    delete(product: Product) {
        let obs = this.http.delete<Product>(this.url() + '/' + product.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    publish(product: Product) {
        let obs = this.http.post<Product>(this.url() + '/' + product.id + '/publish', {}, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    unpublish(product: Product) {
        let obs = this.http.post<Product>(this.url() + '/' + product.id + '/unpublish', {}, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

}
