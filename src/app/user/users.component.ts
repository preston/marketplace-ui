import {Component, Output, Inject, OnInit} from '@angular/core';
import {User} from './user';
import {Identity} from '../identity/identity';
import {Product} from '../product/product';
import {IdentityProvider} from '../identity_provider/identity_provider';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {UserService} from './user.service';
import {GroupService} from '../group/group.service';
import {IdentityService} from '../identity/identity.service';
import {ProductService} from '../product/product.service';
import {IdentityProviderService} from '../identity_provider/identity_provider.service';
import {BackendService} from '../backend/backend.service';

// import {XmlExporterService} from '../products/xml_exporter.service';

import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {

    // The current selection, if any.
    user: User = null;
    identities: Array<Identity>;
    products: Array<Product>;

    users: Array<User> = new Array<User>();
    identityProviders: Array<IdentityProvider> = new Array<IdentityProvider>();

    constructor(private backendService: BackendService,
        private userService: UserService,
        private identityService: IdentityService,
        private productService: ProductService,
        private identityProviderService: IdentityProviderService,
        private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.identities = new Array<Identity>();
        this.products = new Array<Product>();
        this.userService.index().subscribe(d => {
            this.users = d['results'];
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

    select(user: User) {
        this.user = user;
        this.identityService.index(user).subscribe(d => {
            this.identities = d;
        });
        if (this.user) {
            this.productService.indexByUser(this.user).subscribe(d => {
                this.products = d['results'];
            });
        } else {
            this.products = new Array<Product>();
        }

    }

    deleteIdentity(identity: Identity) {
        // this.identityService.delete(this.user, identity).subscribe(d => {
        //     this.users = d['results'];
        // });
    }
}
