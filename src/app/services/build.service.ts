import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';
import {ServiceService} from './service.service';

import {Service} from "../models/service";

@Injectable()
export class BuildService extends BaseService {

    public static PATH: string = '/builds';

    constructor(private serviceService: ServiceService, marketplaceService: MarketplaceService, http: Http) {
        super(marketplaceService, http);
    }

    url(service: Service): string {
        return this.serviceService.url() + '/' + service.id + BuildService.PATH;
    }

    index(service: Service) {
        let builds = this.http.get(this.url(service), this.options()).map(res => res.json());
        return builds;
    }

}
