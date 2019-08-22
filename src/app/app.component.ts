
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

import { BackendService } from './backend/backend.service';
import { config } from 'rxjs';
// import { tmpdir } from 'os';


@Component({
	selector: 'app',

	template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {


	constructor(protected http: HttpClient, private backendService: BackendService) {
		console.log("AppComponent has been initialized to establish router element.");
	}

	ngOnInit(): void {
		console.log("Launching app...");
		this.detectJwtLaunch();
	}

	detectJwtLaunch(): void {
		let root = (document.URL).split("?")[0];
		let start = document.URL.indexOf('?');
		if (start >= 0) {
			let callbackResponse = document.URL.substring(start + 1)
			if (callbackResponse) {
				var responseParameters = (callbackResponse).split("&");
				var parameterMap = {};
				for (var i = 0; i < responseParameters.length; i++) {
					parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
				}
				if (parameterMap[BackendService.JWT_LAUNCH_KEY]) {
					window.localStorage.setItem(BackendService.LOCAL_STORAGE_JWT_KEY, parameterMap['jwt']);
					window.location.href = root;
					console.log("Processed JWT in URL.");
				} else {
					console.log("No JWT found. Oh well.");
				}
			} else {
				console.log("No JWT found in URL.");
			}
		}
	}

}
