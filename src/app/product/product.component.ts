import {Component, Output, Input, OnInit} from '@angular/core';
import {Product} from '../product/product';
import {License} from '../license/license';
import {Status} from '../status/status';
import {Build} from '../build/build';
import {User} from '../user/user';
import {Platform} from '../platform/platform';
import {Instance} from '../instance/instance';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {BuildService} from '../build/build.service';
import {ProductService} from '../product/product.service';
import {LicenseService} from '../license/license.service';
import {PlatformService} from '../platform/platform.service';
import {InstanceService} from '../instance/instance.service';
import { ProductLicenseService } from '../product_license/product_license.service';
import { ProductLicense } from '../product_license/product_license';

@Component({
    selector: 'product',
    templateUrl: 'product.component.html'
})
export class ProductComponent implements OnInit {

    @Input() product: Product;
    @Input() licenses: Array<License>;
    @Input() productLicenses: Array<ProductLicense>;
    @Input() status: Status;

    builds: Array<Build> = new Array<Build>();
    platforms: Array<Platform> = new Array<Platform>();

    constructor(private buildService: BuildService,
        private productService: ProductService,
        private licenseService: LicenseService,
        private productLicenseService: ProductLicenseService,
        private platformService: PlatformService,
        private instanceService: InstanceService,
        private toasterService: ToasterService) {
    }


    ngOnInit() {
        this.reload();
    }

    reload() {
        console.log('Service component for \'' + this.product.name + '\'. Loading builds...');
        this.productLicenseService.index(this.product).subscribe(d => {
            this.productLicenses = d['results'];
            console.log('Loaded ' + this.productLicenses.length + ' productLicenses.');
        });
        this.buildService.index(this.product).subscribe(d => {
            this.builds = d['results'];
            console.log('Loaded ' + this.builds.length + ' builds.');
        });
        if (this.status.identity) {
            this.platformService.index(this.status.identity['user']).subscribe(d => {
                this.platforms = d['results'];
                console.log('Loaded ' + this.platforms.length + ' platforms.');
            });
        } else {
            console.log("Cannot load known platforms for an anonymous user.");
        }
    }

    licenseFor(id: string): License {
        var match: License = null;
        for (var l of this.licenses) {
            if (l.id == id) {
                match = l;
                break;
            }
        }
        return match;
    }

    createInstance(build: Build, platform: Platform) {
        console.log("Attempting to create an instance of build " + build.id + " on platform " + platform.id + '.');
        let instance = new Instance();
        instance.platform_id = platform.id;
        this.instanceService.create(this.status.identity['user'], platform, instance).subscribe(d => {
            let instance: Instance = d;// as Instance;
            this.toasterService.pop('success', 'Instance Requested', 'Any/All listening platform agents have been pushed a notification and should now be processing the command.');
            console.log('Loaded ' + this.platforms.length + ' platforms.');
        });
    }

}
