import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {auctiondetails} from './auctiondetails';
import {Bidregistry} from './Bidregistry';
import {RegistryComponent} from '../registry/registry.component';
import {LoginComponent} from '../login/login.component';
import {ResultComponent} from '../result/result.component';

const auctionRoutes: Routes = [
    {path:'login',component:LoginComponent},
    { path: 'auctiondetails',  component:auctiondetails},
    { path: 'bidregistry/:id', component: Bidregistry },
     {path:'registry',component:RegistryComponent},
     {path:'results',component:ResultComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(auctionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class auctionrouting{}
