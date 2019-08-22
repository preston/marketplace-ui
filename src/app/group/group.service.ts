import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';

import {Group} from '../group/group';

@Injectable()
export class GroupService extends BaseService {

    public static PATH: string = '/groups';

    constructor(backendService: BackendService, http: HttpClient) {
        super(backendService, http);
    }

    url(): string {
        return this.backendService.getUrl() + GroupService.PATH;
    }

    index() {
        let groups = this.http.get<Group[]>(this.url(), {headers: this.headers()}).pipe(map(res => res));
        return groups;
    }

    get(id: string) {
        let platform = this.http.get<Group>(this.url() + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return platform;
    }


    create(group: Group) {
        let obs = this.http.post<Group>(this.url(), { 'group': group }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

	update(group: Group) {
		let obs = this.http.put<Group>(this.url() + '/' + group.id, { 'group': group }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}

	delete(group: Group) {
		let obs = this.http.delete<Group>(this.url() + '/' + group.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}
}
