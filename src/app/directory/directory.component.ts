
import {Component, Output, Inject, OnInit} from '@angular/core';

import {Service} from '../service/service';
import {License} from '../license/license';
import {Search} from '../search/search';

import {ToasterService} from 'angular2-toaster/angular2-toaster';

import {ServiceService} from '../service/service.service';
import {LicenseService} from '../license/license.service';
import {BackendService} from '../backend/backend.service';

import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'directory',
    templateUrl: 'directory.component.html',
    // providers: [CarouselModule]
	providers: []
})
export class DirectoryComponent implements OnInit {

    // The currently selected service, if any.
    service: Service = null;

    services: Array<Service> = new Array<Service>();
    licenses: Array<License> = new Array<License>();

    searchQuery: Search;
    status: Object;

    constructor(private backendService: BackendService,
        private serviceService: ServiceService,
        private licenseService: LicenseService,
        private toasterService: ToasterService,
        @Inject('Window') private window: Window) {
    }

    ngOnInit() {
        this.reload();
    }


	reload() {
		this.searchQuery = new Search();
		this.licenseService.index().subscribe(d => {
			this.licenses = d['results'];
			this.loadInitialServices();
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

}
