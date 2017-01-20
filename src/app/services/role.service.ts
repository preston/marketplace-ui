import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';

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
        let roles = this.http.get(this.url(), this.options()).map(res => res.json());
        return roles;
    }

}
