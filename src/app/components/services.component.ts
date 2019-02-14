import {Component, Output, Inject, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {Service} from '../models/service';
import {License} from '../models/license';
import {Status} from '../models/status';
import {Search} from '../models/search';
import {Build} from '../models/build';
import {IdentityProvider} from '../models/identity_provider';

import {UUID} from 'angular2-uuid';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {BuildService} from '../services/build.service';
import {UserService} from '../services/user.service';
import {LicenseService} from '../services/license.service';
import {ServiceService} from '../services/service.service';
import {MarketplaceService} from '../services/marketplace.service';

@Component({
    selector: 'services',
    templateUrl: '../views/services.pug'
})
export class ServicesComponent implements OnInit {


    @Input() status: Object;

    // The current selection, if any.
    service: Service;
    services: Array<Service>;
    logoFile: File;

    licenses: Array<License> = new Array<License>();
    builds: Array<Build> = new Array<Build>();

    constructor(private marketplaceService: MarketplaceService,
        private serviceService: ServiceService,
        private buildService: BuildService,
        private licenseService: LicenseService,
        private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.services = new Array<Service>();
        this.serviceService.index().subscribe(d => {
            this.services = d['results'];
        });
        this.licenseService.index().subscribe(d => {
            this.licenses = d['results'];
        });
    }

    select(service: Service) {
        this.service = service;
        if (this.service) {
            this.buildService.index(this.service).subscribe(d => {
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
                this.service.logo = reader.result.toString();
                // this.loadFromContentString(reader.result);
            }
            reader.readAsBinaryString(this.logoFile);
        }
    }

    create() {
        let service = new Service();
        service.name = "New Service " + UUID.UUID();
        service.user_id = this.status['identity']['user_id'];
        if (this.licenses.length == 0) {
            this.toasterService.pop('error', 'No License Types', 'Please establish a license type prior to declared services.');
        } else {
            service.license_id = this.licenses[0].id;
            this.serviceService.create(service).subscribe(d => {
                this.toasterService.pop('success', 'Service Created', 'Please update the details accordingly!');
                this.services.push(d);
                this.select(d);
            });
        }
    }
    update(service: Service) {
        this.serviceService.update(service).subscribe(d => {
            this.toasterService.pop('success', 'Service Updated');
            let i = this.services.indexOf(service, 0);
            this.services[i] = d;
        });
    }
    delete(service: Service) {
        this.serviceService.delete(service).subscribe(d => {
            this.toasterService.pop('success', 'Service Deleted');
            let i = this.services.indexOf(service, 0);
            if (i >= 0) {
                this.services.splice(i, 1);
            }
            this.select(null);
        });
    }

    publish(service: Service) {
        this.serviceService.publish(service).subscribe(d => {
            this.toasterService.pop('success', 'Service Published!');
            let i = this.services.indexOf(service, 0);
            this.services[i] = d;
            this.service = d;
        });
    }
    unpublish(service: Service) {
        this.serviceService.unpublish(service).subscribe(d => {
            this.toasterService.pop('success', 'Service Unpublished');
            let i = this.services.indexOf(service, 0);
            this.services[i] = d;
            this.service = d;
        });
    }

    createBuild(service: Service) {

		let build = new Build();
		build.service_id = this.service.id;
		build.service_version = UUID.UUID();
		build.version = UUID.UUID();
		build.container_repository = 'https://example.com';
		build.container_tag = UUID.UUID();
		this.buildService.create(this.service, build).subscribe(d => {
			this.toasterService.pop('success', 'Build Created', 'Please update the details accordingly!');
			this.builds.push(d);
		});
    }

    updateBuild(build: Build) {
		this.buildService.update(this.service, build).subscribe(d => {
			this.toasterService.pop('success', 'Build Updated');
			let i = this.builds.indexOf(build, 0);
			this.builds[i] = d;
		});
    }

    deleteBuild(build: Build) {
		this.buildService.delete(this.service, build).subscribe(d => {
			this.toasterService.pop('success', 'Build Deleted');
			let i = this.builds.indexOf(build, 0);
			if (i >= 0) {
				this.builds.splice(i, 1);
			}
		});
    }
}
