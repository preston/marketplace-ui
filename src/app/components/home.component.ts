import {Component, Output, Inject} from '@angular/core';
import {Service} from '../models/service';
import {License} from '../models/license';
import {Status} from '../models/status';
import {Search} from '../models/search';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {window} from '@angular/browser';

import {ServiceService} from '../services/service.service';
import {LicenseService} from '../services/license.service';
// import {XmlExporterService} from '../services/xml_exporter.service';

import {Http} from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: '/home.html'
})
export class HomeComponent {

    // The currently selected service, if any.
    service: Service = null;

    services: Array<Service> = new Array<Service>();
    licenses: Array<License> = new Array<License>();

    searchQuery: Search;

    constructor(private serviceService: ServiceService, private licenseService: LicenseService, @Inject('Window') private window: Window) {
        this.reload();
    }

    reload() {
        this.searchQuery = new Search();
        this.licenseService.index().subscribe(d => {
            this.licenses = d;
            this.loadInitialServices();
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


}
