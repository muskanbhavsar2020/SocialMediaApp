import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
const materials = [
  MatButtonModule, MatDialogModule, MatFormFieldModule, MatCardModule, MatToolbarModule, MatIconModule,MatMenuModule
,MatBadgeModule
];
@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }
