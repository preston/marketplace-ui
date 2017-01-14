import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {Headers, RequestOptions} from '@angular/http';

import {MarketplaceService} from './marketplace.service';

@Injectable()
export abstract class BaseService {

    constructor(protected marketplaceService: MarketplaceService, protected http: Http) {
    }

    options(): RequestOptions {
        let headers = new Headers({ 'Accept': 'application/json' });
        return new RequestOptions({ headers: headers });
    }

}
