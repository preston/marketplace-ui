import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';
import {ServiceService} from './service.service';

import {Service} from "../models/service";

@Injectable()
export class StatusService extends BaseService {

    public static PATH: string = '/status';

    constructor(private serviceService: ServiceService, marketplaceService: MarketplaceService, http: HttpClient) {
        super(marketplaceService, http);
    }

    url(): string {
        return this.marketplaceService.url + StatusService.PATH;
    }

    latest() {
        let status = this.http.get(this.url(), {headers: this.headers()}).pipe(map(res => res));
        return status;
    }

}
