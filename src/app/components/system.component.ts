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
import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';
import {IdentityService} from '../services/identity.service';
import {IdentityProviderService} from '../services/identity_provider.service';
import {MarketplaceService} from '../services/marketplace.service';

// import {XmlExporterService} from '../services/xml_exporter.service';

import {Http} from '@angular/http';

@Component({
    selector: 'system',
    templateUrl: '/system.html'
})
export class SystemComponent {

    // The currently selected service, if any.
    service: Service = null;

    services: Array<Service> = new Array<Service>();
    licenses: Array<License> = new Array<License>();
    identityProviders: Array<IdentityProvider> = new Array<IdentityProvider>();

    status: Object;

    constructor(private marketplaceService: MarketplaceService,
        private serviceService: ServiceService,
        private licenseService: LicenseService,
        private identityProviderService: IdentityProviderService,
        private userService: UserService,
		private toasterService: ToasterService) {
        this.reload();
    }

    reload() {
        // this.loadMarketplaceStatus();
        this.identityProviderService.index().subscribe(d => {
            this.identityProviders = d;
        });
        this.licenseService.index().subscribe(d => {
            this.licenses = d;
            // this.loadInitialServices();
        });
    }

}
