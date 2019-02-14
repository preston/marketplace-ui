import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import { map } from 'rxjs/operators';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';

import {Role} from '../models/role';

@Injectable()
export class RoleService extends BaseService {

    public static PATH: string = '/roles';

    constructor(marketplaceService: MarketplaceService, http: Http) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + RoleService.PATH;
    }

    index() {
        let roles = this.http.get(this.url(), this.options()).pipe(map(res => res.json()));
        return roles;
    }

    get(id: string) {
        let platform = this.http.get(this.url() + '/' + id, this.options()).pipe(map(res => res.json()));
        return platform;
    }


    create(role: Role) {
        let obs = this.http.post(this.url(), { 'role': role }, this.options()).pipe(map(res => res.json()));
        return obs;
    }

	update(role: Role) {
		let obs = this.http.put(this.url() + '/' + role.id, { 'role': role }, this.options()).pipe(map(res => res.json()));
        return obs;
	}

	delete(role: Role) {
		let obs = this.http.delete(this.url() + '/' + role.id, this.options()).pipe(map(res => res.json()));
        return obs;
	}
}
