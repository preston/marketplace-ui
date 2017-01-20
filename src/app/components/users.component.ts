import {Component, Output, Inject} from '@angular/core';
import {User} from '../models/user';
import {Identity} from '../models/identity';
import {Group} from '../models/group';
import {IdentityProvider} from '../models/identity_provider';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';
import {IdentityService} from '../services/identity.service';
import {IdentityProviderService} from '../services/identity_provider.service';
import {MarketplaceService} from '../services/marketplace.service';

// import {XmlExporterService} from '../services/xml_exporter.service';

import {Http} from '@angular/http';

@Component({
    selector: 'users',
    templateUrl: '/users.html'
})
export class UsersComponent {

    // The current selection, if any.
    user: User = null;
    identities: Array<Identity>;

    users: Array<User> = new Array<User>();
    identityProviders: Array<IdentityProvider> = new Array<IdentityProvider>();

    constructor(private marketplaceService: MarketplaceService,
        private userService: UserService,
        private identityService: IdentityService,
        private identityProviderService: IdentityProviderService,
        private toasterService: ToasterService) {
        this.reload();
    }

    reload() {
        this.identities = new Array<Identity>();
        this.userService.index().subscribe(d => {
            this.users = d['results'];
        });
        this.identityProviderService.index().subscribe(d => {
            this.identityProviders = d;
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
    
    select(user: User) {
        this.user = user;
        this.identityService.index(user).subscribe(d => {
            this.identities = d;
        });
    }

    deleteIdentity(identity: Identity) {
        // this.identityService.delete(this.user, identity).subscribe(d => {
        //     this.users = d['results'];
        // });
    }
}
