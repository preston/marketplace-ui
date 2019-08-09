import {Component} from '@angular/core';
import { ToasterConfigurationService } from '../toaster/toaster.configuration.service';

@Component({
    selector: 'documentation',
	templateUrl: 'documentation.component.html',
	styleUrls: ['documentation.component.scss']
})
export class DocumentationComponent {

    verses: Object[] = [];

	public toasterConfig = ToasterConfigurationService.TOASTER_CONFIG

    stringify(obj: any): string {
        return JSON.stringify(obj, null, "\t").trim();
    }

}
