import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectoryComponent } from './directory/directory.component';
import { SystemComponent } from './system/system.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
    { path: '', component: DirectoryComponent },
    { path: 'account', component: AccountComponent },
    { path: 'system', component: SystemComponent }
    // { path: 'api', component: ApiComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
