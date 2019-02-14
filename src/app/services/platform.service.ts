import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import { map } from 'rxjs/operators';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';
import {UserService} from './user.service';

import {User} from "../models/user";
import {Platform} from "../models/platform";

@Injectable()
export class PlatformService extends BaseService {

    public static PATH: string = '/platforms';

    constructor(private userService: UserService, marketplaceUser: MarketplaceService, http: Http) {
        super(marketplaceUser, http);
    }

    url(user: User): string {
        return this.userService.url() + '/' + user.id + PlatformService.PATH;
    }

    index(user: User) {
        let platforms = this.http.get(this.url(user), this.options()).pipe(map(res => res.json()));
        return platforms;
    }

    get(user: User, id: string) {
        let platform = this.http.get(this.url(user) + '/' + id, this.options()).pipe(map(res => res.json()));
        return platform;
    }


    create(user: User, platform: Platform) {
        let obs = this.http.post(this.url(user), { 'platform': platform }, this.options()).pipe(map(res => res.json()));
        return obs;
    }

	update(user: User, platform: Platform) {
		let obs = this.http.put(this.url(user) + '/' + platform.id, { 'platform': platform }, this.options()).pipe(map(res => res.json()));
        return obs;
	}

	delete(user: User, platform: Platform) {
		let obs = this.http.delete(this.url(user) + '/' + platform.id, this.options()).pipe(map(res => res.json()));
        return obs;
	}
}
