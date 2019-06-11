import {Component, Output, Inject, Input, OnChanges} from '@angular/core';
import {Identity} from '../identity/identity';
import {User} from '../user/user';
import {Status} from '../status/status';
import {Platform} from '../platform/platform';
import {IdentityProvider} from '../identity_provider/identity_provider';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {PlatformService} from '../platform/platform.service';
import {UserService} from '../user/user.service';
import {BackendService} from '../backend/backend.service';

import {UUID} from 'angular2-uuid';

import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'platforms',
    templateUrl: 'platforms.component.html'
})
export class PlatformsComponent implements OnChanges {
    @Input() user: User;
    platforms: Array<Platform>;

    constructor(private backendService: BackendService,
        private platformService: PlatformService,
        private toasterService: ToasterService) {
    }

    reload() {
        this.platformService.index(this.user).subscribe(d => {
            this.platforms = d['results'];
        });
    }

    ngOnChanges() {
        if (this.user) {
            console.log("Reloading platforms.");
            this.reload();
        }
    }

    create() {
        let platform = new Platform();
        platform.name = "My IaaS " + UUID.UUID();
        platform.user_id = this.user.id;
        this.platformService.create(this.user, platform).subscribe(d => {
            this.toasterService.pop('success', 'Platform Added', 'Please update the details accordingly!');
            this.platforms.push(d);
        });
    }

    update(platform: Platform) {
        this.platformService.update(this.user, platform).subscribe(d => {
            this.toasterService.pop('success', 'Platform Updated');
            let i = this.platforms.indexOf(platform, 0);
            this.platforms[i] = d;
        });
    }

    delete(platform: Platform) {
        this.platformService.delete(this.user, platform).subscribe(d => {
            this.toasterService.pop('success', 'Platform Unregistered');
            let i = this.platforms.indexOf(platform, 0);
            if (i >= 0) {
                this.platforms.splice(i, 1);
            }
        });
    }
}
