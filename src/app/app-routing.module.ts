import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BollywoodComponent } from './bollywood/bollywood.component';
import { HollywoodComponent } from './hollywood/hollywood.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MoviesComponent } from './movies/movies.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { TollywoodComponent } from './tollywood/tollywood.component';
import { WatchlaterComponent } from './watchlater/watchlater.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'movies',component:MoviesComponent,children:[
    {path:'tollywood',component:TollywoodComponent},
    {path:'bollywood',component:BollywoodComponent},
    {path:'hollywood',component:HollywoodComponent},
    {path:'',redirectTo:'tollywood',pathMatch:'full'}
  ]},
  {path:'watchlater',component:WatchlaterComponent},
  {path:'movies/:language/moviedetails/:moviename',component:MoviedetailsComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  { path: 'admin/movies', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
