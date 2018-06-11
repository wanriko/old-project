import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'change-grade', loadChildren: './change-grade/change-grade.module#ChangeGradeModule' },   
            { path: 'location', loadChildren: './location/location.module#LocationModule' },
            { path: 'location-item', loadChildren: './location-item/location-item.module#LocationItemModule' },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
