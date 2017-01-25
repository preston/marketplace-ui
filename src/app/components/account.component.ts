import {Component, Output, Inject} from '@angular/core';
import {Identity} from '../models/identity';
import {User} from '../models/user';
import {Status} from '../models/status';
import {Search} from '../models/search';
import {IdentityProvider} from '../models/identity_provider';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {IdentityService} from '../services/identity.service';
import {UserService} from '../services/user.service';
import {IdentityProviderService} from '../services/identity_provider.service';
import {MarketplaceService} from '../services/marketplace.service';

import {Http} from '@angular/http';

@Component({
    selector: 'account',
    templateUrl: '/account.html'
})
export class AccountComponent {

    status: Object;

    identityProviders: Array<IdentityProvider>; // = new Array<IdentityProvider>();
    identities: Array<Identity>;
    user: User;

    constructor(private marketplaceService: MarketplaceService,
        private userService: UserService,
        private identityService: IdentityService,
        private identityProviderService: IdentityProviderService) {
        this.reload();
    }

    reload() {
        this.status = {};
        this.identities = new Array<Identity>();
        this.marketplaceService.status().subscribe(d => {
            this.status = d;
            this.userService.get(this.status['identity']['user_id']).subscribe(d => {
                this.user = d as User;
                this.identityService.index(this.user).subscribe(d => {
                    this.identities = d;
                });
            });
        });
        this.identityProviderService.index().subscribe(d => {
            this.identityProviders = d['results'];
        });

    }

    identityProviderFor(id: string): IdentityProvider {
        var match: IdentityProvider = null;
        for (var idp of this.identityProviders) {
            if (idp.id == id) {
                match = idp;
                break;
            }
        }
        return match;
    }

}
