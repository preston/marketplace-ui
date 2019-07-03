import {Component, Output, Inject, OnInit} from '@angular/core';
import {Product} from '../product/product';
import {License} from '../license/license';
import {IdentityProvider} from '../identity_provider/identity_provider';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

// import {window} from '@angular/browser';

import {ProductService} from '../product/product.service';
import {LicenseService} from '../license/license.service';
import {UserService} from '../user/user.service';
import {GroupService} from '../group/group.service';
import {IdentityService} from '../identity/identity.service';
import {IdentityProviderService} from '../identity_provider/identity_provider.service';
import {BackendService} from '../backend/backend.service';

// import {XmlExporterService} from '../products/xml_exporter.service';

import {HttpClient} from '@angular/common/http';
import { Status } from '../status/status';
import { ToasterConfigurationService } from '../toaster/toaster.configuration.service';

@Component({
    selector: 'system',
    templateUrl: 'system.component.html'
})
export class SystemComponent implements OnInit {

    // The currently selected service, if any.
    product: Product = null;

    products: Array<Product> = new Array<Product>();
    licenses: Array<License> = new Array<License>();
    identityProviders: Array<IdentityProvider> = new Array<IdentityProvider>();

	status: Status;

	public toasterConfig = ToasterConfigurationService.TOASTER_CONFIG

    constructor(private backendService: BackendService,
        private productService: ProductService,
        private licenseService: LicenseService,
        private identityProviderService: IdentityProviderService,
        private userService: UserService,
        private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.backendService.status().subscribe(d => {
            this.status = d;
        });
        this.identityProviderService.index().subscribe(d => {
            this.identityProviders = d['results'];
        });
        this.licenseService.index().subscribe(d => {
            this.licenses = d;
        });
    }

}
