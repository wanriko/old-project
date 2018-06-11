import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;
import { AuthGuard } from './components/guard/login.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]
    }, 
    {
        path: 'Home',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]
    },
    { path: 'login', loadChildren: './components/login/login.module#LoginModule' }

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class routing { }