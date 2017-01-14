import {Component, Output, Inject} from '@angular/core';
import {Service} from '../models/service';
import {Status} from '../models/status';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {window} from '@angular/browser';

import {ServiceService} from '../services/service.service';
// import {XmlExporterService} from '../services/xml_exporter.service';

import {Http} from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: '/home.html'
})
export class HomeComponent {

    service: Service = null;
    services: Array<Service> = new Array<Service>();

    constructor(private serviceService: ServiceService, @Inject('Window') private window: Window) {
        this.reload();
    }

    reload() {
        this.serviceService.index().subscribe(d => {
            this.services = d;
        });
    }

}
