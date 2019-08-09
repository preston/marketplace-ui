import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Status } from "../status/status";


@Injectable()
export class BackendService {

	// FIXME Hardcoded URLs
	public url: string = 'http://localhost:3000';
	// public url: string = 'https://marketplace-server.logicahealth.org';

	public websocket_url: string = 'ws://localhost:3000';
	// public websocket_url: string = 'wss://marketplace-server.logicahealth.org';

	public static STATUS_PATH: string = '/status';
	public static SESSIONS_PATH: string = '/sessions';
	public static WEBSOCKET_PATH: string = '/websocket';

	public static JWT_LAUNCH_KEY: string = 'jwt';
	public static LOCAL_STORAGE_JWT_KEY: string = 'jwt';

	constructor(protected http: HttpClient) {
	}

	public requestOptions(includeBearerToken: boolean): HttpHeaders {
		var headers = new HttpHeaders({ 'Accept': 'application/json' });
		if (includeBearerToken) {
			let jwt = localStorage.getItem(BackendService.LOCAL_STORAGE_JWT_KEY);
			if (jwt) {
				headers = headers.set('Authorization', 'Bearer ' + jwt);
				// headers =  headers.set('Foozle', 'Bearer ' + jwt);
			}
		}
		return headers;
	}

	statusUrl(): string {
		return this.url + BackendService.STATUS_PATH;
	}
	sessionsUrl(): string {
		return this.url + BackendService.SESSIONS_PATH;
	}
	webSocketUrl(): string {
		return this.websocket_url + BackendService.WEBSOCKET_PATH;
	}

	// logout() {
	//     let status = this.http.delete(this.sessionsUrl(), this.requestOptions(true)).pipe(map(res => res);
	//     return status;
	// }

	status() {
		let status = this.http.get<Status>(this.statusUrl(), { headers: this.requestOptions(true) }).pipe(map(res => res));
		return status;
	}
}
