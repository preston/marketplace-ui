import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';

@Injectable()
export class UserService extends BaseService {

    public static PATH: string = '/users';

    constructor(marketplaceService: MarketplaceService, http: Http) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + UserService.PATH;
    }

    index() {
        let users = this.http.get(this.url(), this.options()).map(res => res.json());
        return users;
    }

}
