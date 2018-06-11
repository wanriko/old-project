import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationItemComponent } from './location-item.component';

const routes: Routes = [
    {
        path: '', component:LocationItemComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LocationItemRoutingModule { }