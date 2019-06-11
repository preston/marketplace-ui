
import {Component, Output, Inject, OnInit} from '@angular/core';
import {Service} from '../service/service';
import {License} from '../license/license';
import {Status} from '../status/status';
import {Search} from '../search/search';
import {IdentityProvider} from '../identity_provider/identity_provider';

import {ToasterService} from 'angular2-toaster/angular2-toaster';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {ServiceService} from '../service/service.service';
import {LicenseService} from '../license/license.service';
import {IdentityProviderService} from '../identity_provider/identity_provider.service';
import {BackendService} from '../backend/backend.service';

// import {XmlExporterService} from '../services/xml_exporter.service';

import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'directory',
    templateUrl: 'directory.component.html',
    // providers: [CarouselModule]
	providers: []
})
export class DirectoryComponent implements OnInit {

    // The currently selected service, if any.
    service: Service = null;

    services: Array<Service> = new Array<Service>();
    licenses: Array<License> = new Array<License>();
    identityProviders: Array<IdentityProvider> = new Array<IdentityProvider>();

    searchQuery: Search;
    status: Object;

    constructor(private backendService: BackendService,
        private serviceService: ServiceService,
        private licenseService: LicenseService,
        private identityProviderService: IdentityProviderService,
        private toasterService: ToasterService,
        @Inject('Window') private window: Window) {
    }

    ngOnInit() {
        this.reload();
		this.detectJwtLaunch();
    }

	detectJwtLaunch(): void {
		let root = (document.URL).split("#")[0];
		let start = document.URL.indexOf('#');
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

	reload() {
		this.searchQuery = new Search();
		this.loadMarketplaceStatus();
		this.identityProviderService.index().subscribe(d => {
			this.identityProviders = d['results'];
			console.log("IdentityProvider records: " + this.identityProviders.length);
		});
		this.licenseService.index().subscribe(d => {
			this.licenses = d['results'];
			this.loadInitialServices();
		});
	}

	loadMarketplaceStatus() {
		this.status = {};
		this.backendService.status().subscribe(d => {
			this.status = d;
			console.log("Server status: ");
			console.log(this.status);
			this.toasterService.pop('success', "Hi");
		});
	}

	loadInitialServices() {
		this.serviceService.published().subscribe(d => {
			this.services = d['results'];
		});
	}
	select(service: Service) {
		this.service = service;
	}

	search() {
		if (this.validSearch()) {
			this.serviceService.searchPublished(this.searchQuery.text).subscribe(d => {
				this.services = d['results'];
			});
		} else {
			this.loadInitialServices();
		}
	}

	validSearch() {
		return this.searchQuery.text.length > 2;
	}

	logout() {
		localStorage.removeItem(BackendService.LOCAL_STORAGE_JWT_KEY);
		// this.backendService.logout().subscribe(d => {
			this.loadMarketplaceStatus();
		// 	console.log("Logout complete.");
			this.toasterService.pop('success', 'Logged out.', 'See you next time!');
		// });
	}


}
