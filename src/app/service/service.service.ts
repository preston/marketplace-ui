import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';
import {Service} from '../models/service';
import {License} from '../models/license';
import {User} from '../models/user';

@Injectable()
export class ServiceService extends BaseService {

    public static PATH: string = '/services';
    public static SEARCH_PATH: string = '/services/search';

    constructor(marketplaceService: MarketplaceService, http: HttpClient) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + ServiceService.PATH;
    }

    searchUrl(): string {
        return this.marketplaceService.url + ServiceService.SEARCH_PATH;
    }

    search(text: string) {
        let services = this.http.post<Service[]>(this.searchUrl(), { text: text }, {headers: this.headers()}).pipe(map(res => res));
        return services;
    }

    searchPublished(text: string) {
        let services = this.http.post<Service[]>(this.searchUrl() + '?published=true', { text: text }, {headers: this.headers()}).pipe(map(res => res));
        return services;
    }

    searchUnpublished(text: string) {
        let services = this.http.post<Service[]>(this.searchUrl() + '?published=false', { text: text }, {headers: this.headers()}).pipe(map(res => res));
        return services;
    }

	index() {
        let services = this.http.get<Service[]>(this.url(), {headers: this.headers()}).pipe(map(res => res));
        return services;
    }

	indexByLicense(license: License) {
        let services = this.http.get<Service[]>(this.url() + '?license_id=' + license.id , {headers: this.headers()}).pipe(map(res => res));
        return services;
    }

	indexByUser(user: User) {
        let services = this.http.get<Service[]>(this.url() + '?user_id=' + user.id , {headers: this.headers()}).pipe(map(res => res));
        return services;
    }

    published() {
        let services = this.http.get<Service[]>(this.url() + '?published=true', {headers: this.headers()}).pipe(map(res => res));
        return services;
    }

    unpublished() {
        let services = this.http.get<Service[]>(this.url() + '?published=false', {headers: this.headers()}).pipe(map(res => res));
        return services;
    }

    get(id: string) {
        let service = this.http.get<Service>(this.url() + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return service;
    }

    create(service: Service) {
        let obs = this.http.post<Service>(this.url(), { 'service': service }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    update(service: Service) {
        let obs = this.http.put<Service>(this.url() + '/' + service.id, { 'service': service }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    delete(service: Service) {
        let obs = this.http.delete<Service>(this.url() + '/' + service.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    publish(service: Service) {
        let obs = this.http.post<Service>(this.url() + '/' + service.id + '/publish', {}, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    unpublish(service: Service) {
        let obs = this.http.post<Service>(this.url() + '/' + service.id + '/unpublish', {}, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

}
