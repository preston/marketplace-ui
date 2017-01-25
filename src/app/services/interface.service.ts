import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';

import {Interface} from '../models/interface';

@Injectable()
export class InterfaceService extends BaseService {

    public static PATH: string = '/interfaces';

    constructor(marketplaceService: MarketplaceService, http: Http) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + InterfaceService.PATH;
    }

    index() {
        let interfaces = this.http.get(this.url(), this.options()).map(res => res.json());
        return interfaces;
    }

    get(id: string) {
        let platform = this.http.get(this.url() + '/' + id, this.options()).map(res => res.json());
        return platform;
    }


    create(iface: Interface) {
        let obs = this.http.post(this.url(), { 'interface': iface }, this.options()).map(res => res.json());
        return obs;
    }

    update(iface: Interface) {
        let obs = this.http.put(this.url() + '/' + iface.id, { 'interface': iface }, this.options()).map(res => res.json());
        return obs;
    }

    delete(iface: Interface) {
        let obs = this.http.delete(this.url() + '/' + iface.id, this.options()).map(res => res.json());
        return obs;
    }
}
