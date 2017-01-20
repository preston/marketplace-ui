import {ModuleWithProviders, enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import {Http} from '@angular/http';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
// import {DragulaModule} from 'ng2-dragula/ng2-dragula';

import { CarouselModule} from 'ng2-bootstrap';

import {AppComponent} from './app/app.component';
import {HomeComponent} from './app/components/home.component';
import {AccountComponent} from './app/components/account.component';
import {ApiComponent} from './app/components/api.component';
import {ServiceComponent} from './app/components/service.component';
import {SystemComponent} from './app/components/system.component';
import {UsersComponent} from './app/components/users.component';
import {GroupsComponent} from './app/components/groups.component';

import {BuildService} from './app/services/build.service';
import {LicenseService} from './app/services/license.service';
import {MarketplaceService} from './app/services/marketplace.service';
import {ServiceService} from './app/services/service.service';
import {StatusService} from './app/services/status.service';
import {UserService} from './app/services/user.service';
import {GroupService} from './app/services/group.service';
import {RoleService} from './app/services/role.service';
import {IdentityService} from './app/services/identity.service';
import {IdentityProviderService} from './app/services/identity_provider.service';

// import {ExportModule} from './app/modules/export.module';

enableProdMode();


import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'account', component: AccountComponent },
	{ path: 'system', component: SystemComponent },
    { path: 'api', component: ApiComponent }
]
const appRoutingProviders: any[] = [];
const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule,
        ToasterModule,
		CarouselModule
    ],
    declarations: [
        AppComponent,
        ApiComponent,
        HomeComponent,
		AccountComponent,
		ServiceComponent,
		SystemComponent,
		UsersComponent,
		GroupsComponent
		// CarouselComponent,
		// SlideComponent
    ],   // components and directives
    providers: [
        appRoutingProviders,
        ToasterService,
        BuildService,
        LicenseService,
        MarketplaceService,
        ServiceService,
        StatusService,
        UserService,
		GroupService,
		RoleService,
		IdentityService,
		IdentityProviderService,
		{ provide: 'Window', useValue: window }
    ],                    // services
    bootstrap: [AppComponent]     // root component
})
export class AppModule {
}
