import {Component, Output, Inject} from '@angular/core';
import {Service} from '../models/service';
import {License} from '../models/license';
import {Status} from '../models/status';
import {Search} from '../models/search';
import {IdentityProvider} from '../models/identity_provider';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

// import {window} from '@angular/browser';

import {ServiceService} from '../services/service.service';
import {LicenseService} from '../services/license.service';
import {IdentityProviderService} from '../services/identity_provider.service';
import {MarketplaceService} from '../services/marketplace.service';

// import {XmlExporterService} from '../services/xml_exporter.service';

import {Http} from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: '/home.html',
	providers: [CarouselModule]

})
export class HomeComponent {

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
        this.reload();
    }

    reload() {
        this.searchQuery = new Search();
        this.loadMarketplaceStatus();
        this.identityProviderService.index().subscribe(d => {
            this.identityProviders = d;
        });
        this.licenseService.index().subscribe(d => {
            this.licenses = d;
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
        this.serviceService.index().subscribe(d => {
            this.services = d;
        });
    }
    select(service: Service) {
        this.service = service;
    }

    search() {
        if (this.validSearch()) {
            this.serviceService.search(this.searchQuery.text).subscribe(d => {
                this.services = d;
            });
        } else {
            this.loadInitialServices();
        }
    }

    validSearch() {
        return this.searchQuery.text.length > 2;
    }

    logout() {
        this.marketplaceService.logout().subscribe(d => {
            this.loadMarketplaceStatus();
            console.log("Logout complete.");
			this.toasterService.pop('success', 'Logged out.', 'See you next time!');
        });
    }


}
