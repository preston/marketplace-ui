import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';
import {Service} from '../models/service';

@Injectable()
export class ServiceService extends BaseService {

    public static PATH: string = '/services';
    public static SEARCH_PATH: string = '/services/search';

    constructor(marketplaceService: MarketplaceService, http: Http) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + ServiceService.PATH;
    }

    searchUrl(): string {
        return this.marketplaceService.url + ServiceService.SEARCH_PATH;
    }

    search(text: string) {
        let services = this.http.post(this.searchUrl(), { text: text }, this.options()).map(res => res.json());
        return services;
    }


    index() {
        // this.services = this.http.get(url).map(res => res.json());
        let services = this.http.get(this.url(), this.options()).map(res => res.json());
        return services;
    }

    get(id: string) {
        let service = this.http.get(this.url() + '/' + id, this.options()).map(res => res.json());
        return service;
    }

    put(service: Service) {
    }

    post(service: Service) {
    }

    delete(service: Service) {
    }

}
