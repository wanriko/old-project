import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountStockComponent } from './count-stock.component';

const routes: Routes = [
    {
        path: '', component: CountStockComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CountStockRoutingModule { }
