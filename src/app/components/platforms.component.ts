import {Component, Output, Inject, Input, OnChanges} from '@angular/core';
import {Identity} from '../models/identity';
import {User} from '../models/user';
import {Status} from '../models/status';
import {Platform} from '../models/platform';
import {IdentityProvider} from '../models/identity_provider';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {PlatformService} from '../services/platform.service';
import {UserService} from '../services/user.service';
import {MarketplaceService} from '../services/marketplace.service';

import {UUID} from 'angular2-uuid';

import {Http} from '@angular/http';

@Component({
    selector: 'platforms',
    templateUrl: '/platforms.html'
})
export class PlatformsComponent implements OnChanges {
    @Input() user: User;
    platforms: Array<Platform>;

    constructor(private marketplaceService: MarketplaceService,
        private platformService: PlatformService,
        private toasterService: ToasterService) {
    }

    reload() {
        this.platformService.index(this.user).subscribe(d => {
            this.platforms = d;
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
        // console.log(this.user);
        // console.log('Creating new platform registration.');
        // console.log(platform);
        this.platformService.create(this.user, platform).subscribe(d => {
            this.toasterService.pop('success', 'Platform Added', 'Please update the details accordingly!');
            this.platforms.push(d);
        });
    }

    delete(platform: Platform) {
        this.platformService.delete(this.user, platform).subscribe(d => {
            this.toasterService.pop('success', 'Platform Unregistered');
            let i = this.platforms.indexOf(platform, 0);
            if (i > 0) {
                this.platforms.splice(i, 1);
            }
        });
    }
}
