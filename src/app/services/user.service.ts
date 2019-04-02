import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';

@Injectable()
export class UserService extends BaseService {

    public static PATH: string = '/users';

    constructor(marketplaceService: MarketplaceService, http: HttpClient) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + UserService.PATH;
    }

    index() {
        let users = this.http.get(this.url() + "?per_page=999", {headers: this.headers()}).pipe(map(res => res));
        return users;
    }

    get(id: string) {
        let user = this.http.get(this.url() + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return user;
    }

}
