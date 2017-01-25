import {Component, Output, Inject} from '@angular/core';
import {User} from '../models/user';
import {Role} from '../models/Role';
import {Status} from '../models/status';
import {Search} from '../models/search';
import {IdentityProvider} from '../models/identity_provider';

import {UUID} from 'angular2-uuid';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {UserService} from '../services/user.service';
import {RoleService} from '../services/role.service';
import {MarketplaceService} from '../services/marketplace.service';

@Component({
    selector: 'roles',
    templateUrl: '/roles.html'
})
export class RolesComponent {

    // The current selection, if any.
    role: Role;
    roles: Array<Role>;

    constructor(private marketplaceService: MarketplaceService,
        private roleService: RoleService,
        private toasterService: ToasterService) {
        this.reload();
    }

    reload() {
        this.roles = new Array<Role>();
        this.roleService.index().subscribe(d => {
            this.roles = d['results'];
        });
    }

    select(role: Role) {
        this.role = role;
    }

    create() {
        let role = new Role();
        role.name = "New Role " + UUID.UUID();
        this.roleService.create(role).subscribe(d => {
            this.toasterService.pop('success', 'Role Created', 'Please update the details accordingly!');
            this.roles.push(d);
            this.select(d);
        });
    }
    update(role: Role) {
        this.roleService.update(role).subscribe(d => {
            this.toasterService.pop('success', 'Role Updated');
            let i = this.roles.indexOf(role, 0);
            this.roles[i] = d;
        });
    }
    delete(role: Role) {
        this.roleService.delete(role).subscribe(d => {
            this.toasterService.pop('success', 'Role Deleted');
            let i = this.roles.indexOf(role, 0);
            if (i >= 0) {
                this.roles.splice(i, 1);
            }
            this.select(null);
        });
    }
}
