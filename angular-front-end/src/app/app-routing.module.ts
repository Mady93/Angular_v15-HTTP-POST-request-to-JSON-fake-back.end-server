import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { ErrorComponent } from './components/error/error.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'person-create', component: PersonCreateComponent },
    { path: 'person-edit/:id', component: PersonEditComponent },
    { path: 'person-list', component: PersonListComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }