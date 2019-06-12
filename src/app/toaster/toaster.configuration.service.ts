import { ToasterConfig } from 'angular2-toaster';
import { Component } from '@angular/core';


@Component({
	selector: 'system'
})
export class ToasterConfigurationService {

	public static TOASTER_CONFIG = new ToasterConfig({
		mouseoverTimerStop: true,
		// timeout: -1, # Prevents automatic dismissal after timeout
		animation: 'flyRight',
		positionClass: 'toast-bottom-right'
	});

}
