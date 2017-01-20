import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {User} from '../models/user';

import {BaseService} from "./base.service";
import {UserService} from "./user.service";

import {MarketplaceService} from './marketplace.service';

@Injectable()
export class IdentityService extends BaseService {

    public static PATH: string = '/identities';

    constructor(private userService: UserService, marketplaceService: MarketplaceService, http: Http) {
        super(marketplaceService, http);
    }

    url(user: User): string {
        return this.userService.url() + '/' + user.id + IdentityService.PATH;
    }

    index(user: User) {
        let identities = this.http.get(this.url(user), this.options()).map(res => res.json());
        return identities;
    }


    get(user: User, id: string) {
        let identity = this.http.get(this.url(user) + '/' + id, this.options()).map(res => res.json());
        return identity;
    }

}
