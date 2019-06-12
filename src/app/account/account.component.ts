import {Component, Output, Inject} from '@angular/core';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {Identity} from '../identity/identity';
import {User} from '../user/user';
import {IdentityProvider} from '../identity_provider/identity_provider';


import {IdentityService} from '../identity/identity.service';
import {UserService} from '../user/user.service';
import {IdentityProviderService} from '../identity_provider/identity_provider.service';
import {BackendService} from '../backend/backend.service';
import { ToasterConfigurationService } from '../toaster/toaster.configuration.service';


@Component({
    selector: 'account',
    templateUrl: 'account.component.html'
})
export class AccountComponent {

    status: Object;

    identityProviders: Array<IdentityProvider>; // = new Array<IdentityProvider>();
    identities: Array<Identity>;
    user: User;

	public toasterConfig = ToasterConfigurationService.TOASTER_CONFIG

    constructor(private backendService: BackendService,
        private userService: UserService,
        private identityService: IdentityService,
        private identityProviderService: IdentityProviderService) {
        this.reload();
    }

    reload() {
        this.status = {};
        this.identities = new Array<Identity>();
        this.backendService.status().subscribe(d => {
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

	readJwt(): string {
		return localStorage.getItem(BackendService.LOCAL_STORAGE_JWT_KEY);
	}

}
