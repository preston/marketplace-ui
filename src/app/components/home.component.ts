import {Component, Output, Inject} from '@angular/core';
import {Service} from '../models/service';
import {License} from '../models/license';
import {Status} from '../models/status';
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

    service: Service = null;
    services: Array<Service> = new Array<Service>();
    licenses: Array<License> = new Array<License>();

    constructor(private serviceService: ServiceService, private licenseService: LicenseService, @Inject('Window') private window: Window) {
        this.reload();
    }

    reload() {
        this.licenseService.index().subscribe(d => {
            this.licenses = d;
            this.serviceService.index().subscribe(d => {
                this.services = d;
            });
        });
    }

	select(service: Service) {

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

}
