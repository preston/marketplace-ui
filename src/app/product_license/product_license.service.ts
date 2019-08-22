import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';

import {License} from '../license/license';
import { Product } from '../product/product';
import { ProductLicense } from './product_license';

@Injectable()
export class ProductLicenseService extends BaseService {

    public static PATH: string = '/products';

    constructor(backendService: BackendService, http: HttpClient) {
        super(backendService, http);
    }

    url(product: Product): string {
        return this.backendService.getUrl() + ProductLicenseService.PATH + '/' + product.id + '/licenses';
    }

    index(product: Product) {
        let licenses = this.http.get<ProductLicense[]>(this.url(product), {headers: this.headers()}).pipe(map(res => res));
        return licenses;
    }

    get(product: Product, id: string) {
        let platform = this.http.get<ProductLicense>(this.url(product) + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return platform;
    }


    create(product: Product, license: License) {
        let obs = this.http.post<License>(this.url(product), { 'license': license }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    update(product: Product, license: License) {
        let obs = this.http.put<License>(this.url(product) + '/' + license.id, { 'license': license }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    delete(product: Product, license: License) {
        let obs = this.http.delete<License>(this.url(product) + '/' + license.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }
}
