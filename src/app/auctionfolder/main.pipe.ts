import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {editedauctionlist} from "./pipe";

@NgModule({
  declarations:[editedauctionlist],
  imports:[CommonModule],
  exports:[editedauctionlist]
})

export class MainPipe{}