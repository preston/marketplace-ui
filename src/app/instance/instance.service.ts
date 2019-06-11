import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {BaseService} from "../base/base.service";

import {BackendService} from '../backend/backend.service';
import {PlatformService} from '../platform/platform.service';

import {User} from "../user/user";
import {Platform} from "../platform/platform";
import {Instance} from "../instance/instance";

@Injectable()
export class InstanceService extends BaseService {

    public static PATH: string = '/instances';

    constructor(private platformService: PlatformService, marketplacePlatform: BackendService, http: HttpClient) {
        super(marketplacePlatform, http);
    }

    url(user: User, platform: Platform): string {
        return this.platformService.url(user) + '/' + platform.id + InstanceService.PATH;
    }

    index(user: User, platform: Platform) {
        let instances = this.http.get<Instance[]>(this.url(user, platform), {headers: this.headers()}).pipe(map(res => res));
        return instances;
    }

    get(user: User, platform: Platform, id: string) {
        let instance = this.http.get<Instance>(this.url(user, platform) + '/' + id, {headers: this.headers()}).pipe(map(res => res));
        return instance;
    }


    create(user: User, platform: Platform, instance: Instance) {
        let obs = this.http.post<Instance>(this.url(user, platform), { 'instance': instance }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
    }

	update(user: User, platform: Platform, instance: Instance) {
		let obs = this.http.put<Instance>(this.url(user, platform) + '/' + instance.id, { 'instance': instance }, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}

	delete(user: User, platform: Platform, instance: Instance) {
		let obs = this.http.delete<Instance>(this.url(user, platform) + '/' + instance.id, {headers: this.headers()}).pipe(map(res => res));
        return obs;
	}
}
