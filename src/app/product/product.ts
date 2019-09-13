import {User} from '../user/user';
import {License} from '../license/license';
import {Build} from '../build/build';
import { ProductLicense } from '../product_license/product_license';

export class Product {

    public id: string = '';
    public name: string = '';
    public description: string = '';
    public user_id: string = '';
    public uri: string = '';
    public support_url: string = '';
	public external_id: string;
	public mime_type: string = '';

	public logo: File;

	public user: User;

	public published_at: Date;
	public visible_at: Date;
	public created_at: Date;
	public updated_at: Date;

	public product_licenses: Array<ProductLicense> = [];
    public builds: Array<Build> = new Array<Build>();

}
