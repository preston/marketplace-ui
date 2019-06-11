import {Component, Output, Inject} from '@angular/core';

import {UUID} from 'angular2-uuid';

import {Role} from './role';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {RoleService} from './role.service';
import {BackendService} from '../backend/backend.service';

@Component({
    selector: 'roles',
    templateUrl: 'roles.component.html'
})
export class RolesComponent {

    // The current selection, if any.
    role: Role;
    roles: Array<Role>;

    constructor(private backendService: BackendService,
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
