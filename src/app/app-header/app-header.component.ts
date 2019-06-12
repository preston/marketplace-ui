import { Component, OnInit } from '@angular/core';
import { IdentityProviderService } from '../identity_provider/identity_provider.service';
import { IdentityProvider } from '../identity_provider/identity_provider';
import { ToasterService } from 'angular2-toaster';
import { BackendService } from '../backend/backend.service';

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
	status: Object;
	identityProviders: Array<IdentityProvider> = new Array<IdentityProvider>();

	constructor(private backendService: BackendService,
		private identityProviderService: IdentityProviderService, private toasterService: ToasterService) {

	}

	ngOnInit() {
		this.reload();
	}

	reload() {
		this.loadMarketplaceStatus();
		this.identityProviderService.index().subscribe(d => {
			this.identityProviders = d['results'];
			console.log("IdentityProvider records: " + this.identityProviders.length);
		});
	}

	loadMarketplaceStatus() {
		this.status = {};
		this.backendService.status().subscribe(d => {
			this.status = d;
			console.log("Server status: ");
			console.log(this.status);
			this.toasterService.pop('success', "Hi");
		});
	}

	logout() {
		localStorage.removeItem(BackendService.LOCAL_STORAGE_JWT_KEY);
		// this.backendService.logout().subscribe(d => {
		this.loadMarketplaceStatus();
		// 	console.log("Logout complete.");
		this.toasterService.pop('success', 'Logged out.', 'See you next time!');
		// });
	}


}
