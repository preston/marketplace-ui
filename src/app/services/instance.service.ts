import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {BaseService} from "./base.service";

import {MarketplaceService} from './marketplace.service';
import {PlatformService} from './platform.service';

import {User} from "../models/user";
import {Platform} from "../models/platform";
import {Instance} from "../models/instance";

@Injectable()
export class InstanceService extends BaseService {

    public static PATH: string = '/instances';

    constructor(private platformService: PlatformService, marketplacePlatform: MarketplaceService, http: Http) {
        super(marketplacePlatform, http);
    }

    url(user: User, platform: Platform): string {
        return this.platformService.url(user) + '/' + platform.id + InstanceService.PATH;
    }

    index(user: User, platform: Platform) {
        let instances = this.http.get(this.url(user, platform), this.options()).map(res => res.json());
        return instances;
    }

    get(user: User, platform: Platform, id: string) {
        let instance = this.http.get(this.url(user, platform) + '/' + id, this.options()).map(res => res.json());
        return instance;
    }


    create(user: User, platform: Platform, instance: Instance) {
        let obs = this.http.post(this.url(user, platform), { 'instance': instance }, this.options()).map(res => res.json());
        return obs;
    }

	update(user: User, platform: Platform, instance: Instance) {
		let obs = this.http.put(this.url(user, platform) + '/' + instance.id, { 'instance': instance }, this.options()).map(res => res.json());
        return obs;
	}

	delete(user: User, platform: Platform, instance: Instance) {
		let obs = this.http.delete(this.url(user, platform) + '/' + instance.id, this.options()).map(res => res.json());
        return obs;
	}
}
