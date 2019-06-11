import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {HttpHeaders} from '@angular/common/http';

import {MarketplaceService} from './marketplace.service';

@Injectable()
export abstract class BaseService {

    constructor(protected marketplaceService: MarketplaceService, protected http: HttpClient) {
    }

    headers(): HttpHeaders {
		return this.marketplaceService.requestOptions(true);
    }

}
