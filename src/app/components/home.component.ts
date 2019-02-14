import {Component, Output, Inject, OnInit} from '@angular/core';
import {Service} from '../models/service';
import {License} from '../models/license';
import {Status} from '../models/status';
import {Search} from '../models/search';
import {IdentityProvider} from '../models/identity_provider';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {ServiceService} from '../services/service.service';
import {LicenseService} from '../services/license.service';
import {IdentityProviderService} from '../services/identity_provider.service';
import {MarketplaceService} from '../services/marketplace.service';

// import {XmlExporterService} from '../services/xml_exporter.service';

import {Http} from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: '../views/home.pug',
    // providers: [CarouselModule]
    providers: []

})
export class HomeComponent implements OnInit {

    // The currently selected service, if any.
    service: Service = null;

    services: Array<Service> = new Array<Service>();
    licenses: Array<License> = new Array<License>();
    identityProviders: Array<IdentityProvider> = new Array<IdentityProvider>();

    searchQuery: Search;
    status: Object;

    constructor(private marketplaceService: MarketplaceService,
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
				if (parameterMap[MarketplaceService.JWT_LAUNCH_KEY]) {
					window.localStorage.setItem(MarketplaceService.LOCAL_STORAGE_JWT_KEY, parameterMap['jwt']);
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
		});
		this.licenseService.index().subscribe(d => {
			this.licenses = d['results'];
			this.loadInitialServices();
		});
	}

	loadMarketplaceStatus() {
		this.status = {};
		this.marketplaceService.status().subscribe(d => {
			this.status = d;
			console.log("Server status: ");
			console.log(this.status);
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
		localStorage.removeItem(MarketplaceService.LOCAL_STORAGE_JWT_KEY);
		// this.marketplaceService.logout().subscribe(d => {
			this.loadMarketplaceStatus();
		// 	console.log("Logout complete.");
			this.toasterService.pop('success', 'Logged out.', 'See you next time!');
		// });
	}


}
