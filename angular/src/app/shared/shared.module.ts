import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    FlexLayoutModule,

    MatToolbarModule,
    MatIconModule,
    MatIconModule
  ]
})
export class SharedModule { }
