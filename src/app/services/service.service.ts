import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {MarketplaceService} from './marketplace.service';
import {Service} from '../models/service';

@Injectable()
export class ServiceService {

	public path: string = '/services';
	// protected services: Observable<Service> = new Observable<Service>();

	constructor(private marketplaceService: MarketplaceService, private http: Http) {
	}

	index() {
		var url = this.marketplaceService.url + this.path + '.json';
		// console.log('URL: ' + url);
		// this.services = this.http.get(url).map(res => res.json());
		let services = this.http.get(url).map(res => res.json());
		return services;

	}

	get(service: Service) {
	}

	put(service: Service) {
	}

	post(service: Service) {
	}

	delete(service: Service) {
	}

}
