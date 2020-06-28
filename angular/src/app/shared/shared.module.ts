import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    FlexLayoutModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class SharedModule { }
