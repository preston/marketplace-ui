import {Product} from '../product/product';


export class Build {

	public id: string = '';
    public release_notes: string = '';
    public container_repository: string = '';
    public container_tag: string = '';
    public version: string = '';
	public asset: boolean;
	public validated_at: Date;
	public published_at: Date;
	public created_at: Date;
	public updated_at: Date;

    public product_id: string = '';
    public product: Product;

}
