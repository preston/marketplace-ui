import {User} from './user';
import {License} from './license';
import {Build} from './build';

export class Service {

    public name: string = '';
    public description: string = '';
    public user_id: string = '';
    public uri: string = '';
    public support_url: string = '';
	public license_id: string = '';

	public license: License;
	public user: User;

	public visible_at: Date;
	public created_at: Date;
	public updated_at: Date;

    public builds: Array<Build> = new Array<Build>();

}
