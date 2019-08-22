import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';

import {License} from '../license/license';

@Injectable()
export class LicenseService extends BaseService {

    public static PATH: string = '/licenses';

    constructor(backendService: BackendService, http: HttpClient) {
        super(backendService, http);
    }

    url(): string {
        return this.backendService.getUrl() + LicenseService.PATH;
    }

    index() {
        let licenses = this.http.get<License[]>(this.url(), {headers: this.headers()}).pipe(map(res => res));
        return licenses;
    }

    get(id: string) {
        let platform = this.http.get<License>(this.url() + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return platform;
    }


    create(license: License) {
        let obs = this.http.post<License>(this.url(), { 'license': license }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    update(license: License) {
        let obs = this.http.put<License>(this.url() + '/' + license.id, { 'license': license }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

    delete(license: License) {
        let obs = this.http.delete<License>(this.url() + '/' + license.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }
}
