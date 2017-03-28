import {Service} from './service';


export class Build {

	public id: string = '';
    public release_notes: string = '';
    public container_repository: string = '';
    public container_tag: string = '';
    public service_version: string = '';

	public validated_at: Date;
	public published_at: Date;
	public created_at: Date;
	public updated_at: Date;

    public service_id: string = '';
    public service: Service;

}
