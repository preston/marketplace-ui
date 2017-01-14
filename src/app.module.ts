import {ModuleWithProviders, enableProdMode} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import {Http} from '@angular/http';

import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
// import {DragulaModule} from 'ng2-dragula/ng2-dragula';

import {AppComponent} from './app/app.component';
import {HomeComponent} from './app/components/home.component';
import {ApiComponent} from './app/components/api.component';

import {BuildService} from './app/services/build.service';
import {LicenseService} from './app/services/license.service';
import {MarketplaceService} from './app/services/marketplace.service';
import {ServiceService} from './app/services/service.service';
import {StatusService} from './app/services/status.service';
import {UserService} from './app/services/user.service';

// import {ExportModule} from './app/modules/export.module';

enableProdMode();


import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
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
        ToasterModule
    ],
    declarations: [
        AppComponent,
        ApiComponent,
        HomeComponent
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
		{ provide: 'Window', useValue: window }
    ],                    // services
    bootstrap: [AppComponent]     // root component
})
export class AppModule {
}
