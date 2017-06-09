import {Injectable} from "@angular/core";
import {Headers, RequestOptions} from '@angular/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class MarketplaceService {

    public url: string = 'http://localhost:3000';
    // public url: string = 'https://marketplace-server.hspconsortium.org';

    public websocket_url: string = 'ws://localhost:3000';
    // public websocket_url: string = 'wss://marketplace-server.hspconsortium.org';

    public static STATUS_PATH: string = '/status';
    public static SESSIONS_PATH: string = '/sessions';
    public static WEBSOCKET_PATH: string = '/websocket';

	public static JWT_LAUNCH_KEY: string = 'jwt';
	public static LOCAL_STORAGE_JWT_KEY: string = 'jwt';

    constructor(protected http: Http) {
    }

	public requestOptions(includeBearerToken: boolean): RequestOptions {
		let headers = new Headers({ 'Accept': 'application/json' });
		if (includeBearerToken) {
			headers.append('Authorization', 'Bearer ' + localStorage.getItem(MarketplaceService.LOCAL_STORAGE_JWT_KEY));
		}
		return new RequestOptions({ headers: headers, withCredentials: true });
	}

    statusUrl(): string {
        return this.url + MarketplaceService.STATUS_PATH;
    }
    sessionsUrl(): string {
        return this.url + MarketplaceService.SESSIONS_PATH;
    }
    webSocketUrl(): string {
        return this.websocket_url + MarketplaceService.WEBSOCKET_PATH;
    }

    // logout() {
    //     let status = this.http.delete(this.sessionsUrl(), this.requestOptions(true)).map(res => res.json());
    //     return status;
    // }

    status() {
        let status = this.http.get(this.statusUrl(), this.requestOptions(true)).map(res => res.json());
        return status;
    }
}
