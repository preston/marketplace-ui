import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';
import {ServiceService} from '../service/service.service';


@Injectable()
export class StatusService extends BaseService {

    public static PATH: string = '/status';

    constructor(private serviceService: ServiceService, backendService: BackendService, http: HttpClient) {
        super(backendService, http);
    }

    url(): string {
        return this.backendService.url + StatusService.PATH;
    }

    latest() {
        let status = this.http.get(this.url(), {headers: this.headers()}).pipe(map(res => res));
        return status;
    }

}