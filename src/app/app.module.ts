import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {auctionmodule} from './auctionfolder/auction.module';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing';
import { RegistryComponent } from './registry/registry.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';

const approute:Routes=[]
@NgModule({
  declarations: [
   AppComponent,
   RegistryComponent,
   LoginComponent,
   ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    auctionmodule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
     ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
