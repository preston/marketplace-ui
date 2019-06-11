import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';
import {ServiceService} from './service.service';

import {Service} from "../models/service";
import {Build} from "../models/build";

@Injectable()
export class BuildService extends BaseService {

    public static PATH: string = '/builds';

    constructor(private serviceService: ServiceService, marketplaceService: MarketplaceService, http: HttpClient) {
        super(marketplaceService, http);
    }

    url(service: Service): string {
        return this.serviceService.url() + '/' + service.id + BuildService.PATH;
    }

    index(service: Service) {
        let builds = this.http.get<Build>(this.url(service), {headers: this.headers()}).pipe(map(res => res));
        return builds;
    }

	create(service: Service, build: Build) {
        let obs = this.http.post<Build>(this.url(service), { 'build': build }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}

	update(service: Service, build: Build) {
		let obs = this.http.put<Build>(this.url(service) + '/' + build.id, { 'build': build }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}

	delete(service: Service, build: Build) {
		let obs = this.http.delete<Build>(this.url(service) + '/' + build.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}
}
