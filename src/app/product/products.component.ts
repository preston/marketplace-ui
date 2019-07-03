import {Component, Output, Inject, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';

import {User} from '../user/user';
import {Product} from '../product/product';
import {License} from '../license/license';
import {Status} from '../status/status';
import {Search} from '../search/search';
import {Build} from '../build/build';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {BuildService} from '../build/build.service';
import {UserService} from '../user/user.service';
import {LicenseService} from '../license/license.service';
import {ProductService} from '../product/product.service';
import {BackendService} from '../backend/backend.service';

@Component({
    selector: 'products',
    templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit {


    @Input() status: Object;

    // The current selection, if any.
    product: Product;
    products: Array<Product>;
    logoFile: File;

    licenses: Array<License> = new Array<License>();
    builds: Array<Build> = new Array<Build>();

    constructor(private backendService: BackendService,
        private productService: ProductService,
        private buildService: BuildService,
        private licenseService: LicenseService,
        private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.products = new Array<Product>();
        this.productService.index().subscribe(d => {
            this.products = d['results'];
        });
        this.licenseService.index().subscribe(d => {
            this.licenses = d['results'];
        });
    }

    select(product: Product) {
        this.product = product;
        if (this.product) {
            this.buildService.index(this.product).subscribe(d => {
                this.builds = d['results'];
                console.log('Loaded ' + this.builds.length + ' builds.');
            });
        } else {
            this.builds = new Array<Build>();
        }

    }

    handleLogoSelect(fileInput: any) {
        console.log("Reading logo.");
        if (fileInput.target.files.length > 0) {
            this.logoFile = <File>fileInput.target.files[0];
            // this.logoFile.
            let reader = new FileReader();
            reader.onload = () => {
                // this text is the content of the file
                // console.log(reader.result);
                this.product.logo = reader.result.toString();
                // this.loadFromContentString(reader.result);
            }
            reader.readAsBinaryString(this.logoFile);
        }
    }

    create() {
        let product = new Product();
        product.name = "New Product " + UUID.UUID();
        product.user_id = this.status['identity']['user_id'];
        if (this.licenses.length == 0) {
            this.toasterService.pop('error', 'No License Types', 'Please establish a license type prior to declared products.');
        } else {
            product.license_id = this.licenses[0].id;
            this.productService.create(product).subscribe(d => {
                this.toasterService.pop('success', 'Service Created', 'Please update the details accordingly!');
                this.products.push(d);
                this.select(d);
            });
        }
    }
    update(product: Product) {
        this.productService.update(product).subscribe(d => {
            this.toasterService.pop('success', 'Service Updated');
            let i = this.products.indexOf(product, 0);
            this.products[i] = d;
        });
    }
    delete(product: Product) {
        this.productService.delete(product).subscribe(d => {
            this.toasterService.pop('success', 'Service Deleted');
            let i = this.products.indexOf(product, 0);
            if (i >= 0) {
                this.products.splice(i, 1);
            }
            this.select(null);
        });
    }

    publish(product: Product) {
        this.productService.publish(product).subscribe(d => {
            this.toasterService.pop('success', 'Service Published!');
            let i = this.products.indexOf(product, 0);
            this.products[i] = d;
            this.product = d;
        });
    }
    unpublish(product: Product) {
        this.productService.unpublish(product).subscribe(d => {
            this.toasterService.pop('success', 'Service Unpublished');
            let i = this.products.indexOf(product, 0);
            this.products[i] = d;
            this.product = d;
        });
    }

    createBuild(product: Product) {

		let build = new Build();
		build.product_id = this.product.id;
		build.product_version = UUID.UUID();
		build.version = UUID.UUID();
		build.container_repository = 'https://example.com';
		build.container_tag = UUID.UUID();
		this.buildService.create(this.product, build).subscribe(d => {
			this.toasterService.pop('success', 'Build Created', 'Please update the details accordingly!');
			this.builds.push(d);
		});
    }

    updateBuild(build: Build) {
		this.buildService.update(this.product, build).subscribe(d => {
			this.toasterService.pop('success', 'Build Updated');
			let i = this.builds.indexOf(build, 0);
			this.builds[i] = d;
		});
    }

    deleteBuild(build: Build) {
		this.buildService.delete(this.product, build).subscribe(d => {
			this.toasterService.pop('success', 'Build Deleted');
			let i = this.builds.indexOf(build, 0);
			if (i >= 0) {
				this.builds.splice(i, 1);
			}
		});
    }
}
