import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Status } from "../status/status";


@Injectable()
export class BackendService {

	// FIXME Hardcoded URLs
	private static DEFAULT_SERVER_URL = 'http://localhost:3000';
	// private static DEFAULT_SERVER_URL = 'https://marketplace-server.logicahealth.org';
	private url: string = BackendService.DEFAULT_SERVER_URL;

	private static DEFAULT_SERVER_WEBSOCKET_URL = 'ws://localhost:3000';
	// private static DEFAULT_SERVER_WEBSOCKET_URL = 'wss:///marketplace-server.logicahealth.org';
	private websocket_url: string = BackendService.DEFAULT_SERVER_WEBSOCKET_URL;

	public static STATUS_PATH: string = '/status';
	public static SESSIONS_PATH: string = '/sessions';
	public static WEBSOCKET_PATH: string = '/websocket';

	public static JWT_LAUNCH_KEY: string = 'jwt';
	public static LOCAL_STORAGE_JWT_KEY: string = 'jwt';

	constructor(protected http: HttpClient) {
	}

	public static CONFIGURATION_PATH: string = '/configuration.json';
	// public configuration = {};

	public getUrl() {
		if (this.url == null) {
			this.checkForConfiguration();
			// console.log("Configuration: ");
			// console.log(this.configuration);
		}
		return this.url;
	}

	public getWebsocketUrl() {
		if (this.websocket_url == null) {
			this.checkForConfiguration();
			// console.log("Configuration: ");
			// console.log(this.configuration);
		}
		return this.websocket_url;
	}


	async checkForConfiguration() {
		try {
			await this.http.get(BackendService.CONFIGURATION_PATH).toPromise().then(resp => {
				// this.configuration = resp;
				let server_url = resp["MARKETPLACE_SERVER_URL"];
				let ws_url = resp["MARKETPLACE_SERVER_WEBSOCKET_URL"]
				if ('' != server_url) {
					this.url = server_url;
				}
				if ('' != ws_url) {
					this.websocket_url = ws_url;
				}
			}
			);
		} catch (e) {
			console.log("Configuration overrides not found. Development defaults will be used.");
		} finally {
			if (this.url == null) {
				this.url = BackendService.DEFAULT_SERVER_URL;
			}
			if (this.websocket_url == null) {
				this.websocket_url = BackendService.DEFAULT_SERVER_WEBSOCKET_URL;
			}
		}
		console.log("Server URL to: " + this.url);
		console.log("Websocket URL to: " + this.websocket_url);

		// return this.configuration;
		// pipe(map(res => res));
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
