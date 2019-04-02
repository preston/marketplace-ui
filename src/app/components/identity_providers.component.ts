import {Component, Output, Inject} from '@angular/core';
import {User} from '../models/user';
import {IdentityProvider} from '../models/identity_provider';
import {Status} from '../models/status';
import {Search} from '../models/search';

import {UUID} from 'angular2-uuid';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {UserService} from '../services/user.service';
import {IdentityProviderService} from '../services/identity_provider.service';
import {MarketplaceService} from '../services/marketplace.service';

@Component({
    selector: 'identity_providers',
    templateUrl: '../views/identity_providers.html'
})
export class IdentityProvidersComponent {

    // The current selection, if any.
    identityProvider: IdentityProvider;
    identityProviders: Array<IdentityProvider>;

    constructor(private marketplaceService: MarketplaceService,
        private identityProviderService: IdentityProviderService,
        private toasterService: ToasterService) {
        this.reload();
    }

    reload() {
        this.identityProviders = new Array<IdentityProvider>();
        this.identityProviderService.index().subscribe(d => {
            this.identityProviders = d['results'];
        });
    }

    select(identityProvider: IdentityProvider) {
        this.identityProvider = identityProvider;
    }

    create() {
        let idp = new IdentityProvider();
        let uuid = UUID.UUID();
        idp.name = "New IdentityProvider " + uuid;
        idp.client_id = uuid;
        idp.client_secret = 'your_secret';
        idp.issuer = 'https://example.com/' + uuid;
        idp.scopes = 'openid email profile';
        this.identityProviderService.create(idp).subscribe(d => {
            this.toasterService.pop('success', 'IDP added', 'Please update the details accordingly!');
            this.identityProviders.push(d);
            this.select(d);
        }, err => {
            this.toasterService.pop('error', "Failed to create IDP.", "Not sure why.. sorry. :(");
        });
    }
    update(identityProvider: IdentityProvider) {
        this.identityProviderService.update(identityProvider).subscribe(d => {
            this.toasterService.pop('success', 'IDP updated and reconfigured!');
            let i = this.identityProviders.indexOf(identityProvider, 0);
            this.identityProviders[i] = d;
        }, err => {
            this.toasterService.pop('error', "Couldn't update IDP.", "The issuer URL must be discoverable, and other fields must be set correctly. Further, do not enable an IDP that isn't updating correctly.");
        });
    }
    delete(identityProvider: IdentityProvider) {
        this.identityProviderService.delete(identityProvider).subscribe(d => {
            this.toasterService.pop('success', 'IDP deleted', "Associated user identitities have been removed, though user records have not been changed.");
            let i = this.identityProviders.indexOf(identityProvider, 0);
            if (i >= 0) {
                this.identityProviders.splice(i, 1);
            }
            this.select(null);
        });
    }

    enable(identityProvider: IdentityProvider) {
        this.identityProviderService.enable(identityProvider).subscribe(d => {
            this.toasterService.pop('success', 'IDP enabled and is now live!');
            let i = this.identityProviders.indexOf(identityProvider, 0);
            this.identityProviders[i] = d;
            this.identityProvider = d;
        }, err => {
            this.toasterService.pop('error', "Couldn't enable.", "Are you sure the issuer URL is discoverable? An IDP that fails backend auto-discovery validation of the issuer URL can't be enabled.");
        });
    }

    disable(identityProvider: IdentityProvider) {
        this.identityProviderService.disable(identityProvider).subscribe(d => {
            this.toasterService.pop('success', 'IDP disabled.');
            let i = this.identityProviders.indexOf(identityProvider, 0);
            this.identityProviders[i] = d;
            this.identityProvider = d;
        }, err => {
            this.toasterService.pop('error', "Couldn't disable.", "This is.. odd. Not sure why, sorry. :(");
        });
    }

}
