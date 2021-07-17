import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TollywoodComponent } from '../tollywood/tollywood.component';
import { BollywoodComponent } from '../bollywood/bollywood.component';
import { HollywoodComponent } from '../hollywood/hollywood.component';
import { MoviedetailsComponent } from '../moviedetails/moviedetails.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TollywoodComponent,
  BollywoodComponent,
  HollywoodComponent,
  MoviedetailsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[TollywoodComponent,
    BollywoodComponent,
    HollywoodComponent,
    MoviedetailsComponent
  ]
})
export class SharedModule { }
