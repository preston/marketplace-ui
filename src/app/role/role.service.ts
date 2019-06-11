import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';

import {Role} from '../role/role';

@Injectable()
export class RoleService extends BaseService {

    public static PATH: string = '/roles';

    constructor(backendService: BackendService, http: HttpClient) {
        super(backendService, http);
    }

    url(): string {
        return this.backendService.url + RoleService.PATH;
    }

    index() {
        let roles = this.http.get<Role[]>(this.url(), {headers: this.headers()}).pipe(map(res => res));
        return roles;
    }

    get(id: string) {
        let platform = this.http.get<Role>(this.url() + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return platform;
    }


    create(role: Role) {
        let obs = this.http.post<Role>(this.url(), { 'role': role }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

	update(role: Role) {
		let obs = this.http.put<Role>(this.url() + '/' + role.id, { 'role': role }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}

	delete(role: Role) {
		let obs = this.http.delete<Role>(this.url() + '/' + role.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}
}
