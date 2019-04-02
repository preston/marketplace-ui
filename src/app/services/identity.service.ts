import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {User} from '../models/user';

import {BaseService} from "./base.service";
import {UserService} from "./user.service";

import {MarketplaceService} from './marketplace.service';
import { Identity } from "../models/identity";
import { Observable } from "rxjs";

@Injectable()
export class IdentityService extends BaseService {

    public static PATH: string = '/identities';

    constructor(private userService: UserService, marketplaceService: MarketplaceService, http: HttpClient) {
        super(marketplaceService, http);
    }

    url(user: User): string {
        return this.userService.url() + '/' + user.id + IdentityService.PATH;
    }

    index(user: User) {
        let identities = this.http.get<Identity[]>(this.url(user), {headers: this.headers()}).pipe(map(res => res));
        return identities;
    }


    get(user: User, id: string): Observable<Identity> {
        let identity = this.http.get<Identity>(this.url(user) + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return identity;
    }

}
