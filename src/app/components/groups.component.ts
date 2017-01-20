import {Component, Output, Inject} from '@angular/core';
import {User} from '../models/user';
import {Group} from '../models/Group';
import {Status} from '../models/status';
import {Search} from '../models/search';
import {IdentityProvider} from '../models/identity_provider';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {SlideComponent, CarouselComponent, CarouselModule} from 'ng2-bootstrap';

import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';
import {MarketplaceService} from '../services/marketplace.service';

@Component({
    selector: 'groups',
    templateUrl: '/groups.html'
})
export class GroupsComponent {

    // The current selection, if any.
    group: Group = null;

    groups: Array<Group> = new Array<Group>();

    constructor(private marketplaceService: MarketplaceService,
        private groupService: GroupService,
        private toasterService: ToasterService) {
        this.reload();
    }

    reload() {
        this.groupService.index().subscribe(d => {
            this.groups = d['results'];
        });
    }

}
