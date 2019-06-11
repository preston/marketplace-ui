import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';

@Injectable()
export class UserService extends BaseService {

    public static PATH: string = '/users';

    constructor(backendService: BackendService, http: HttpClient) {
        super(backendService, http);
    }

    url(): string {
        return this.backendService.url + UserService.PATH;
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
