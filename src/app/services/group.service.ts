import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import { map } from 'rxjs/operators';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';

import {Group} from '../models/group';

@Injectable()
export class GroupService extends BaseService {

    public static PATH: string = '/groups';

    constructor(marketplaceService: MarketplaceService, http: Http) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + GroupService.PATH;
    }

    index() {
        let groups = this.http.get(this.url(), this.options()).pipe(map(res => res.json()));
        return groups;
    }

    get(id: string) {
        let platform = this.http.get(this.url() + '/' + id, this.options()).pipe(map(res => res.json()));
        return platform;
    }


    create(group: Group) {
        let obs = this.http.post(this.url(), { 'group': group }, this.options()).pipe(map(res => res.json()));
        return obs;
    }

	update(group: Group) {
		let obs = this.http.put(this.url() + '/' + group.id, { 'group': group }, this.options()).pipe(map(res => res.json()));
        return obs;
	}

	delete(group: Group) {
		let obs = this.http.delete(this.url() + '/' + group.id, this.options()).pipe(map(res => res.json()));
        return obs;
	}
}
