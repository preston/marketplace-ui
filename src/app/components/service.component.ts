import {Component, Output, Input, OnInit} from '@angular/core';
import {Service} from '../models/service';
import {License} from '../models/license';
import {Status} from '../models/status';
import {Build} from '../models/build';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {BuildService} from '../services/build.service';
import {ServiceService} from '../services/service.service';
import {LicenseService} from '../services/license.service';

@Component({
    selector: 'service',
    templateUrl: '/service.html'
})
export class ServiceComponent implements OnInit {

    @Input() service: Service;
    @Input() licenses: Array<License>;

    builds: Array<Build> = new Array<Build>();

    constructor(private buildService: BuildService,
        private serviceService: ServiceService,
        private licenseService: LicenseService) {
    }


    ngOnInit() {
        this.reload();
    }

    reload() {
        console.log('Service component for \'' + this.service.name + '\'. Loading builds...');
        this.buildService.index(this.service).subscribe(d => {
            this.builds = d;
            console.log('Loaded ' + this.builds.length + ' builds.');
        });
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
