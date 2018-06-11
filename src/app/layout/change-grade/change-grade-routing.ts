import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeGradeComponent } from './change-grade.component';

const routes: Routes = [
    {
        path: '', component:ChangeGradeComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChangeGradeRoutingModule { }
