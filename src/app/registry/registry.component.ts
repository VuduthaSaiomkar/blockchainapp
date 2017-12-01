import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {auctionregistry} from '../auctionfolder/auctionregistry';
import { Router } from '@angular/router';
import {auctionService} from '../auctionfolder/auction.service';


@Component({
   templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent{

form:FormGroup;
enrolled:auctionregistry;

constructor(@Inject(FormBuilder) fb:FormBuilder,private service:auctionService){
	
	this.form=fb.group({

			  auctionid:['',Validators.required],
			  sellername:['', Validators.minLength(3)],
			  itemname:['', Validators.minLength(2)],
			  baseprice:['', Validators.nullValidator],
			  quantity:['', Validators.nullValidator],
			  dateofauction:['',Validators.required],
			  lastdateofacution:['',Validators.required]
			  })
 
 } 
 


submit(value:auctionregistry){

this.service.Enable(value);
	 console.log(value)
}



}
