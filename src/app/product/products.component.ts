import { Component, Output, Inject, Input, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';

import { User } from '../user/user';
import { Product } from '../product/product';
import { License } from '../license/license';
import { Status } from '../status/status';
import { Search } from '../search/search';
import { Build } from '../build/build';

import { ToastrService } from 'ngx-toastr';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import { BuildService } from '../build/build.service';
import { UserService } from '../user/user.service';
import { LicenseService } from '../license/license.service';
import { ProductService } from '../product/product.service';
import { BackendService } from '../backend/backend.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'products',
	templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit {


	@Input() status: Object;

	// The current selection, if any.
	product: Product;
	products: any = { 'results': [] };//: Array<Product> = ;

	childProducts;
	childPage: string = '1';
	parentProducts;
	parentPage: string = '1';
	// logoFile: File;

	logoUploadProgress;
	logoPreviewUrl: string | ArrayBuffer;

	licenses: Array<License> = new Array<License>();
	// builds: Array<Build> = new Array<Build>();

	searchQuery = new Search;
	searchPage = "1";

	constructor(private backendService: BackendService,
		private productService: ProductService,
		private buildService: BuildService,
		private licenseService: LicenseService,
		private toastrService: ToastrService) {
	}

	ngOnInit() {
		this.reload();
	}


	search() {
		this.unselect();
		this.productService.search(this.searchQuery.text, this.searchPage).subscribe(d => {
			this.products = d;
		});
	}

	reload() {
		this.search();
		this.licenseService.index().subscribe(d => {
			this.licenses = d['results'];
		});
	}

	unselect() {
		this.product = null;
		// this.product.builds = new Array<Build>();
	}
	select(product: Product) {
		if (this.product == product) {
			this.unselect();
		} else {
			this.product = product;
			if (this.product) {
				this.buildService.index(this.product).subscribe(d => {
					this.product.builds = d['results'];
					console.log('Loaded ' + this.product.builds.length + ' builds.');
				});
				this.reloadChildren()
				this.reloadParents();
			} else {
				this.unselect();
			}
		}
	}

	handleLogoSelect(fileInput: any) {
		console.log("Selected logo file: " + fileInput);
		this.product.logo = fileInput.target.files[0];
		// if (fileInput.target.files.length > 0) {
		// this.productService.updateLogo(this.product, fileInput.target.files[0] );
		// }
		this.preview();
	}

	handleBuildAssetSelect(build: Build, fileInput: any) {
		console.log("Selected build asset file: " + fileInput);
		build.asset = fileInput.target.files[0];
	}

	preview() {
		// Show preview
		var mimeType = this.product.logo.type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(this.product.logo);
		reader.onload = (_event) => {
			this.logoPreviewUrl = reader.result;
		}
	}

	create() {
		let product = new Product();
		product.name = "New Product " + UUID.UUID();
		product.user_id = this.status['identity']['user_id'];
		if (this.licenses.length == 0) {
			this.toastrService.error('Please establish a license type prior to declared products.', 'No License Types');
		} else {
			// product.license_id = this.licenses[0].id;
			this.productService.create(product).subscribe(d => {
				this.toastrService.success('Please update the details accordingly!', 'Product Created');
				this.products['results'].push(d);
				this.select(d);
			});
		}
	}
	update(product: Product) {
		this.productService.update(product).subscribe(d => {
			this.toastrService.success('Product Updated');
			let i = this.products['results'].indexOf(product, 0);
			this.products[i] = d;
		}, err => {
			this.toastrService.error("Not sure why.. sorry. :(", "Failed to update product.");
			console.log(err);
		});
	}
	delete(product: Product) {
		this.productService.delete(product).subscribe(d => {
			this.toastrService.success('Product Deleted');
			let i = this.products['results'].indexOf(product, 0);
			if (i >= 0) {
				this.products['results'].splice(i, 1);
			}
			this.select(null);
		});
	}

	publish(product: Product) {
		this.productService.publish(product).subscribe(d => {
			this.toastrService.success('Product Published!');
			let i = this.products['results'].indexOf(product, 0);
			this.products[i] = d;
			this.product = d;
		});
	}
	unpublish(product: Product) {
		this.productService.unpublish(product).subscribe(d => {
			this.toastrService.success('Product Unpublished');
			let i = this.products['results'].indexOf(product, 0);
			this.products[i] = d;
			this.product = d;
		});
	}

	createBuild(product: Product) {

		let build = new Build();
		build.product_id = this.product.id;
		build.version = UUID.UUID();
		build.container_repository = 'https://example.com';
		build.container_tag = UUID.UUID();
		this.buildService.create(this.product, build).subscribe(d => {
			this.toastrService.success('Please update the details accordingly!', 'Build Created');
			this.product.builds.push(d);
		});
	}

	updateBuild(build: Build) {
		console.log(build);
		this.buildService.update(this.product, build).subscribe(d => {
			this.toastrService.success('Build Updated');
			let i = this.product.builds.indexOf(build, 0);
			this.product.builds[i] = d;
		}, err => {
			const errors = <Object>err['error'];
			let msg = '';
			for (let n of Object.entries(errors)) {
				msg += n[0] + ' ' + n[1].join(', ') + ".\n";
			}
			console.log(err);
			this.toastrService.error("Failed to update build.", msg);
		});
	}

	deleteBuild(build: Build) {
		this.buildService.delete(this.product, build).subscribe(d => {
			this.toastrService.success('Build Deleted');
			let i = this.product.builds.indexOf(build, 0);
			if (i >= 0) {
				this.product.builds.splice(i, 1);
			}
		});
	}

	reloadChildren() {
		this.productService.children(this.product, this.childPage.toString()).subscribe(d => {
			this.childProducts = d;
			console.log('Loaded ' + this.childProducts['results'].length + ' children.');
		});
	}

	reloadParents() {
		this.productService.parents(this.product, this.parentPage.toString()).subscribe(d => {
			this.parentProducts = d;
			console.log('Loaded ' + this.parentProducts['results'].length + ' parents.');
		});

	}
}
