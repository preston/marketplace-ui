import {Component, Output, Inject} from '@angular/core';
import {Service} from '../models/service';
import {License} from '../models/license';
import {Status} from '../models/status';
import {Search} from '../models/search';
import {IdentityProvider} from '../models/identity_provider';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {window} from '@angular/browser';

import {ServiceService} from '../services/service.service';
import {LicenseService} from '../services/license.service';
import {IdentityProviderService} from '../services/identity_provider.service';
import {MarketplaceService} from '../services/marketplace.service';

// import {XmlExporterService} from '../services/xml_exporter.service';

import {Http} from '@angular/http';

@Component({
    selector: 'account',
    templateUrl: '/account.html'
})
export class AccountComponent {

	status: Object;

	identityProviders: Array<IdentityProvider> = new Array<IdentityProvider>();

    constructor(private marketplaceService: MarketplaceService, private serviceService: ServiceService, private licenseService: LicenseService, private identityProviderService: IdentityProviderService, @Inject('Window') private window: Window) {
        this.reload();
    }

    reload() {
		this.status = {};
        this.marketplaceService.status().subscribe(d => {
            this.status = d;
            console.log("Server status: ");
            console.log(this.status);
        });
		this.identityProviderService.index().subscribe(d => {
            this.identityProviders = d;
        });

    }

}
