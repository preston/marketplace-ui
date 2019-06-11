export class IdentityProvider {

    public id: string = '';
    public name: string = '';
    public issuer: string = '';
    public client_id: string = '';
    public client_secret: string = '';
    public alternate_client_id: string = '';
    public scopes: string = '';
    public configuration: Object;
    public public_keys: Object;

	public redirect_url: string = '';
	public url: string = '';
	public path: string = '';

    public created_at: Date;
    public updated_at: Date;

}
