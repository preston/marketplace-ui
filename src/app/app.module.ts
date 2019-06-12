import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import {AppComponent} from './app.component';
import {DirectoryComponent} from './directory/directory.component';
import {AccountComponent} from './account/account.component';
import {ServiceComponent} from './service/service.component';
import {ServicesComponent} from './service/services.component';
import {SystemComponent} from './system/system.component';
import {UsersComponent} from './user/users.component';
import {GroupsComponent} from './group/groups.component';
import {RolesComponent} from './role/roles.component';
import {PlatformsComponent} from './platform/platforms.component';
import {IdentityProvidersComponent} from './identity_provider/identity_providers.component';
import {InterfacesComponent} from './interface/interfaces.component';
import {LicensesComponent} from './license/licenses.component';
import {ChatComponent} from './chat/chat.component';

import {BuildService} from './build/build.service';
import {LicenseService} from './license/license.service';
import {BackendService} from './backend/backend.service';
import {ServiceService} from './service/service.service';
import {StatusService} from './status/status.service';
import {UserService} from './user/user.service';
import {GroupService} from './group/group.service';
import {RoleService} from './role/role.service';
import {PlatformService} from './platform/platform.service';
import {InstanceService} from './instance/instance.service';
import {IdentityService} from './identity/identity.service';
import {IdentityProviderService} from './identity_provider/identity_provider.service';
import {InterfaceService} from './interface/interface.service';
import {ToasterConfigurationService} from './toaster/toaster.configuration.service';
import { AppRoutingModule } from './app-routing.module';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { DocumentationComponent } from './documentation/documentation.component';


// Server WebSockets
// import { Ng2CableModule } from 'ng2-cable/dist';


@NgModule({
    imports: [
		AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
		BrowserAnimationsModule, // For Toaster
        ToasterModule.forRoot()
        // CarouselModule,
		// Ng2CableModule
	],
	schemas: [NO_ERRORS_SCHEMA],
	// exports: [RouterModule],
    declarations: [
        AppComponent,
        // ApiComponent,
        DirectoryComponent,
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
        ChatComponent,
        AppHeaderComponent,
		AppFooterComponent,
		DocumentationComponent
        // CarouselComponent,
        // SlideComponent
    ],   // components and directives
    providers: [
        ToasterService,
        BuildService,
        LicenseService,
        BackendService,
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
		ToasterConfigurationService,
        // Ng2CableModule, // ng2-cable
        { provide: 'Window', useValue: window }
    ],                    // services
    bootstrap: [AppComponent]     // root component
})
export class AppModule {
}
