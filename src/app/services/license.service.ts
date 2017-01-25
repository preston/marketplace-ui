import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';

import {License} from '../models/license';

@Injectable()
export class LicenseService extends BaseService {

    public static PATH: string = '/licenses';

    constructor(marketplaceService: MarketplaceService, http: Http) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + LicenseService.PATH;
    }

    index() {
        let licenses = this.http.get(this.url(), this.options()).map(res => res.json());
        return licenses;
    }

    get(id: string) {
        let platform = this.http.get(this.url() + '/' + id, this.options()).map(res => res.json());
        return platform;
    }


    create(license: License) {
        let obs = this.http.post(this.url(), { 'license': license }, this.options()).map(res => res.json());
        return obs;
    }

    update(license: License) {
        let obs = this.http.put(this.url() + '/' + license.id, { 'license': license }, this.options()).map(res => res.json());
        return obs;
    }

    delete(license: License) {
        let obs = this.http.delete(this.url() + '/' + license.id, this.options()).map(res => res.json());
        return obs;
    }
}
