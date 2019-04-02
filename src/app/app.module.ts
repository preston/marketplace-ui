import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA }      from '@angular/core';
import {ModuleWithProviders, enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
// import {DragulaModule} from 'ng2-dragula/ng2-dragula';

// import {CarouselModule} from 'ng2-bootstrap';

import {AppComponent} from './components/app.component';
import {HomeComponent} from './components/home.component';
import {AccountComponent} from './components/account.component';
// import {ApiComponent} from './components/api.component';
import {ServiceComponent} from './components/service.component';
import {ServicesComponent} from './components/services.component';
import {SystemComponent} from './components/system.component';
import {UsersComponent} from './components/users.component';
import {GroupsComponent} from './components/groups.component';
import {RolesComponent} from './components/roles.component';
import {PlatformsComponent} from './components/platforms.component';
import {IdentityProvidersComponent} from './components/identity_providers.component';
import {InterfacesComponent} from './components/interfaces.component';
import {LicensesComponent} from './components/licenses.component';
import {ChatComponent} from './components/chat.component';

import {BuildService} from './services/build.service';
import {LicenseService} from './services/license.service';
import {MarketplaceService} from './services/marketplace.service';
import {ServiceService} from './services/service.service';
import {StatusService} from './services/status.service';
import {UserService} from './services/user.service';
import {GroupService} from './services/group.service';
import {RoleService} from './services/role.service';
import {PlatformService} from './services/platform.service';
import {InstanceService} from './services/instance.service';
import {IdentityService} from './services/identity.service';
import {IdentityProviderService} from './services/identity_provider.service';
import {InterfaceService} from './services/interface.service';


// Server WebSockets
// import { Ng2CableModule } from 'ng2-cable/dist';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'account', component: AccountComponent },
    { path: 'system', component: SystemComponent }
    // { path: 'api', component: ApiComponent }
]
const appRoutingProviders: any[] = [];
const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes
	,{ enableTracing: true }
	);

@NgModule({
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        HttpClientModule,
		BrowserAnimationsModule, // For Toaster
        ToasterModule
        // CarouselModule,
		// Ng2CableModule
	],
	schemas: [NO_ERRORS_SCHEMA],
	// exports: [RouterModule],
    declarations: [
        AppComponent,
        // ApiComponent,
        HomeComponent,
        AccountComponent,
        ServiceComponent,
        ServicesComponent,
        SystemComponent,
        UsersComponent,
        GroupsComponent,
        RolesComponent,
        PlatformsComponent,
		IdentityProvidersComponent,
		LicensesComponent,
		InterfacesComponent,
        ChatComponent
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
        PlatformService,
        InstanceService,
		InterfaceService,
        // Ng2CableModule, // ng2-cable
        { provide: 'Window', useValue: window }
    ],                    // services
    bootstrap: [AppComponent]     // root component
})
export class AppModule {
}
