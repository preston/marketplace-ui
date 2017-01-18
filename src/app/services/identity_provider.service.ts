import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';

@Injectable()
export class IdentityProviderService extends BaseService {

    public static PATH: string = '/identity_providers';

    constructor(marketplaceService: MarketplaceService, http: Http) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + IdentityProviderService.PATH;
    }

    index() {
        let identity_providers = this.http.get(this.url(), this.options()).map(res => res.json());
        return identity_providers;
    }

}
