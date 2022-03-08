import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
const materials = [
  MatButtonModule, MatDialogModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatIconModule
];

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }
