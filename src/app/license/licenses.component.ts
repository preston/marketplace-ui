import {Component, Output, Inject, OnInit} from '@angular/core';

import {License} from '../license/license';
import {Product} from '../product/product';

import {UUID} from 'angular2-uuid';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {UserService} from '../user/user.service';
import {LicenseService} from '../license/license.service';
import {ProductService} from '../product/product.service';
import {BackendService} from '../backend/backend.service';

@Component({
    selector: 'licenses',
    templateUrl: 'licenses.component.html'
})
export class LicensesComponent implements OnInit {

    licenses: Array<License>;

    // The current selection, if any.
    license: License;
    products: Array<Product>;

    constructor(private backendService: BackendService,
        private licenseService: LicenseService,
        private productService: ProductService,
        private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.licenses = new Array<License>();
        this.products = new Array<Product>();
        this.licenseService.index().subscribe(d => {
            this.licenses = d['results'];
        });
    }

    select(license: License) {
        this.license = license;
        if (license) {
            this.productService.indexByLicense(this.license).subscribe(d => {
                this.products = d['results'];
            });
        } else {
            this.licenses = new Array<License>();
        }
    }

    create() {
        let license = new License();
        license.name = "New License " + UUID.UUID();
		license.url = "https://example.com";
        this.licenseService.create(license).subscribe(d => {
            this.toasterService.pop('success', 'License Created', 'Please update the details accordingly!');
            this.licenses.push(d);
            this.select(d);
        });
    }
    update(license: License) {
        this.licenseService.update(license).subscribe(d => {
            this.toasterService.pop('success', 'License Updated');
            let i = this.licenses.indexOf(license, 0);
            this.licenses[i] = d;
        });
    }
    delete(license: License) {
        this.licenseService.delete(license).subscribe(d => {
            this.toasterService.pop('success', 'License Deleted');
            let i = this.licenses.indexOf(license, 0);
            if (i >= 0) {
                this.licenses.splice(i, 1);
            }
            this.select(null);
        });
    }
}
