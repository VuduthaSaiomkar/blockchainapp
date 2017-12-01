import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {auctiondetails} from './auctiondetails';
import {Bidregistry} from './Bidregistry';
import {auctionService} from './auction.service';
import {auctionrouting} from './auction-routing';

@NgModule({

	imports:[
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	auctionrouting],
	declarations:[
    auctiondetails,
    Bidregistry,
  
	],
	providers:[auctionService],

})

export class auctionmodule{}