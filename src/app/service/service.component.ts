import {Component, Output, Input, OnInit} from '@angular/core';
import {Service} from '../service/service';
import {License} from '../license/license';
import {Status} from '../status/status';
import {Build} from '../build/build';
import {User} from '../user/user';
import {Platform} from '../platform/platform';
import {Instance} from '../instance/instance';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {BuildService} from '../build/build.service';
import {ServiceService} from '../service/service.service';
import {LicenseService} from '../license/license.service';
import {PlatformService} from '../platform/platform.service';
import {InstanceService} from '../instance/instance.service';

@Component({
    selector: 'service',
    templateUrl: 'service.component.html'
})
export class ServiceComponent implements OnInit {

    @Input() service: Service;
    @Input() licenses: Array<License>;
    @Input() status: Status;

    builds: Array<Build> = new Array<Build>();
    platforms: Array<Platform> = new Array<Platform>();

    constructor(private buildService: BuildService,
        private serviceService: ServiceService,
        private licenseService: LicenseService,
        private platformService: PlatformService,
        private instanceService: InstanceService,
        private toasterService: ToasterService) {
    }


    ngOnInit() {
        this.reload();
    }

    reload() {
        console.log('Service component for \'' + this.service.name + '\'. Loading builds...');
        this.buildService.index(this.service).subscribe(d => {
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
        instance.build_id = build.id;
        instance.platform_id = platform.id;
        this.instanceService.create(this.status.identity['user'], platform, instance).subscribe(d => {
            let instance: Instance = d;// as Instance;
            this.toasterService.pop('success', 'Instance Requested', 'Any/All listening platform agents have been pushed a notification and should now be processing the command.');
            console.log('Loaded ' + this.platforms.length + ' platforms.');
        });
    }

}
