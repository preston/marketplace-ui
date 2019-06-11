import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';
import {UserService} from '../user/user.service';

import {User} from "../user/user";
import {Platform} from "../platform/platform";

@Injectable()
export class PlatformService extends BaseService {

    public static PATH: string = '/platforms';

    constructor(private userService: UserService, marketplaceUser: BackendService, http: HttpClient) {
        super(marketplaceUser, http);
    }

    url(user: User): string {
        return this.userService.url() + '/' + user.id + PlatformService.PATH;
    }

    index(user: User) {
        let platforms = this.http.get<Platform[]>(this.url(user), {headers: this.headers()}).pipe(map(res => res));
        return platforms;
    }

    get(user: User, id: string) {
        let platform = this.http.get<Platform>(this.url(user) + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return platform;
    }


    create(user: User, platform: Platform) {
        let obs = this.http.post<Platform>(this.url(user), { 'platform': platform }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

	update(user: User, platform: Platform) {
		let obs = this.http.put<Platform>(this.url(user) + '/' + platform.id, { 'platform': platform }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}

	delete(user: User, platform: Platform) {
		let obs = this.http.delete<Platform>(this.url(user) + '/' + platform.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}
}
