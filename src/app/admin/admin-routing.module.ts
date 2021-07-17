import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BollywoodComponent } from '../bollywood/bollywood.component';
import { HollywoodComponent } from '../hollywood/hollywood.component';
import { MoviedetailsComponent } from '../moviedetails/moviedetails.component';
import { TollywoodComponent } from '../tollywood/tollywood.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AdminComponent } from './admin.component';
import { EditmovieComponent } from './editmovie/editmovie.component';

const routes: Routes = [{ path: '', component: AdminComponent,children:[
  {path:'tollywood',component:TollywoodComponent},
  {path:'bollywood',component:BollywoodComponent},
  {path:'hollywood',component:HollywoodComponent},
  {path:'addmovie',component:AddmovieComponent},
  {path:':moviename/moviedetails',component:MoviedetailsComponent},
  {path:':language/editmovie/:moviename',component:EditmovieComponent},
  {path:'',redirectTo:'tollywood',pathMatch:'full'}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
