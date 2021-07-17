import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { EditmovieComponent } from './editmovie/editmovie.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import {FormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    AdminComponent,
    EditmovieComponent,
    AddmovieComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AdminModule { }
