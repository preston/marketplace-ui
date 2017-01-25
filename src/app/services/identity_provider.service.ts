import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';

import {IdentityProvider} from '../models/identity_provider';

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

    get(id: string) {
        let platform = this.http.get(this.url() + '/' + id, this.options()).map(res => res.json());
        return platform;
    }


    create(identity_provider: IdentityProvider) {
        let obs = this.http.post(this.url(), { 'identity_provider': identity_provider }, this.options()).map(res => res.json());
        return obs;
    }

    update(identity_provider: IdentityProvider) {
        let obs = this.http.put(this.url() + '/' + identity_provider.id, { 'identity_provider': identity_provider }, this.options()).map(res => res.json());
        return obs;
    }

    delete(identity_provider: IdentityProvider) {
        let obs = this.http.delete(this.url() + '/' + identity_provider.id, this.options()).map(res => res.json());
        return obs;
    }

    enable(identity_provider: IdentityProvider) {
        let obs = this.http.post(this.url() + '/' + identity_provider.id + '/enable', {}, this.options()).map(res => res.json());
        return obs;
    }

    disable(identity_provider: IdentityProvider) {
        let obs = this.http.post(this.url() + '/' + identity_provider.id + '/disable', {}, this.options()).map(res => res.json());
        return obs;
    }

}
