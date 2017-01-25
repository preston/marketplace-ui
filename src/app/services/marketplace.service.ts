import {Injectable} from "@angular/core";
import {Headers, RequestOptions} from '@angular/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class MarketplaceService {

    // public url: string = 'http://localhost:3000';
    public url: string = 'https://marketplace-server.hspconsortium.org';

    public static STATUS_PATH: string = '/status';
    public static SESSIONS_PATH: string = '/sessions';
    public static REQUEST_OPTIONS = new RequestOptions({ headers: new Headers({ 'Accept': 'application/json' }), withCredentials: true });

    constructor(protected http: Http) {
    }

    statusUrl(): string {
        return this.url + MarketplaceService.STATUS_PATH;
    }
    sessionsUrl(): string {
        return this.url + MarketplaceService.SESSIONS_PATH;
    }

    logout() {
        let status = this.http.delete(this.sessionsUrl(), MarketplaceService.REQUEST_OPTIONS).map(res => res.json());
        return status;
    }

    status() {
        let status = this.http.get(this.statusUrl(), MarketplaceService.REQUEST_OPTIONS).map(res => res.json());
        return status;
    }
}
