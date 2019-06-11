export class Identity {
    public id: string = '';
    public user_id: string = '';
    public identity_provider_id: string = '';
    public sub: string = '';
    public iat: string = '';
    public hd: string = '';
    public locale: string = '';
    public email: string = '';
    public jwt: Object = {};
    public notify_via_email: boolean = false;
    public notify_via_sms: boolean = false;
    public created_at: Date;
    public updated_at: Date;
}
