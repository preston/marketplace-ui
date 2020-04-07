import {Component, Output, Inject} from '@angular/core';

import {UUID} from 'angular2-uuid';

import {IdentityProvider} from '../identity_provider/identity_provider';


import {ToastrService} from 'ngx-toastr';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {IdentityProviderService} from './identity_provider.service';
import {BackendService} from '../backend/backend.service';

@Component({
    selector: 'identity_providers',
    templateUrl: 'identity_providers.component.html'
})
export class IdentityProvidersComponent {

    // The current selection, if any.
    identityProvider: IdentityProvider;
    identityProviders: Array<IdentityProvider>;

    constructor(private backendService: BackendService,
        private identityProviderService: IdentityProviderService,
        private toastrService: ToastrService) {
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
            this.toastrService.success('Please update the details accordingly!', 'IDP added');
            this.identityProviders.push(d);
            this.select(d);
        }, err => {
            this.toastrService.error("Not sure why.. sorry. :(", "Failed to create IDP.");
        });
    }
    update(identityProvider: IdentityProvider) {
        this.identityProviderService.update(identityProvider).subscribe(d => {
            this.toastrService.success('IDP updated and reconfigured!');
            let i = this.identityProviders.indexOf(identityProvider, 0);
            this.identityProviders[i] = d;
        }, err => {
            this.toastrService.error("The issuer URL must be discoverable, and other fields must be set correctly. Further, do not enable an IDP that isn't updating correctly.", "Couldn't update IDP.");
        });
    }
    delete(identityProvider: IdentityProvider) {
        this.identityProviderService.delete(identityProvider).subscribe(d => {
            this.toastrService.success('IDP deleted', "Associated user identitities have been removed, though user records have not been changed.");
            let i = this.identityProviders.indexOf(identityProvider, 0);
            if (i >= 0) {
                this.identityProviders.splice(i, 1);
            }
            this.select(null);
        });
    }

    enable(identityProvider: IdentityProvider) {
        this.identityProviderService.enable(identityProvider).subscribe(d => {
            this.toastrService.success('IDP enabled and is now live!');
            let i = this.identityProviders.indexOf(identityProvider, 0);
            this.identityProviders[i] = d;
            this.identityProvider = d;
        }, err => {
            this.toastrService.error("Are you sure the issuer URL is discoverable? An IDP that fails backend auto-discovery validation of the issuer URL can't be enabled.", "Couldn't enable.");
        });
    }

    disable(identityProvider: IdentityProvider) {
        this.identityProviderService.disable(identityProvider).subscribe(d => {
            this.toastrService.success('IDP disabled.');
            let i = this.identityProviders.indexOf(identityProvider, 0);
            this.identityProviders[i] = d;
            this.identityProvider = d;
        }, err => {
            this.toastrService.error("This is.. odd. Not sure why, sorry. :(", "Couldn't disable.");
        });
    }

}
