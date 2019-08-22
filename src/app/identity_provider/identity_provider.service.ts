import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';

import {IdentityProvider} from '../identity_provider/identity_provider';

@Injectable()
export class IdentityProviderService extends BaseService {

    public static PATH: string = '/identity_providers';

    constructor(backendService: BackendService, http: HttpClient) {
        super(backendService, http);
    }

    url(): string {
        return this.backendService.getUrl() + IdentityProviderService.PATH;
    }

    index() {
        let identity_providers = this.http.get<IdentityProvider[]>(this.url(), {headers: this.headers()}).pipe(map(res => res));
        return identity_providers;
    }

    get(id: string) {
        let platform = this.http.get<IdentityProvider>(this.url() + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return platform;
    }


    create(identity_provider: IdentityProvider) {
        let obs = this.http.post<IdentityProvider>(this.url(), { 'identity_provider': identity_provider }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    update(identity_provider: IdentityProvider) {
        let obs = this.http.put<IdentityProvider>(this.url() + '/' + identity_provider.id, { 'identity_provider': identity_provider }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    delete(identity_provider: IdentityProvider) {
        let obs = this.http.delete<IdentityProvider>(this.url() + '/' + identity_provider.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    enable(identity_provider: IdentityProvider) {
        let obs = this.http.post<IdentityProvider>(this.url() + '/' + identity_provider.id + '/enable', {}, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    disable(identity_provider: IdentityProvider) {
        let obs = this.http.post<IdentityProvider>(this.url() + '/' + identity_provider.id + '/disable', {}, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

}
