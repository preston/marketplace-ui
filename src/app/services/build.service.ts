import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';
import {ServiceService} from './service.service';

import {Service} from "../models/service";
import {Build} from "../models/build";

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

	create(service: Service, build: Build) {
        let obs = this.http.post(this.url(service), { 'build': build }, this.options()).map(res => res.json());
        return obs;
	}

	update(service: Service, build: Build) {
		let obs = this.http.put(this.url(service) + '/' + build.id, { 'build': build }, this.options()).map(res => res.json());
        return obs;
	}

	delete(service: Service, build: Build) {
		let obs = this.http.delete(this.url(service) + '/' + build.id, this.options()).map(res => res.json());
        return obs;
	}
}
