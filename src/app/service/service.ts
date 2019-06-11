import {User} from '../user/user';
import {License} from '../license/license';
import {Build} from '../build/build';

export class Service {

    public id: string = '';
    public name: string = '';
    public description: string = '';
    public user_id: string = '';
    public uri: string = '';
    public support_url: string = '';
	public license_id: string = '';
    public logo: string;

	public license: License;
	public user: User;

	public published_at: Date;
	public visible_at: Date;
	public created_at: Date;
	public updated_at: Date;

    public builds: Array<Build> = new Array<Build>();

}
