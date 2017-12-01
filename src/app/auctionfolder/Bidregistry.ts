import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding,Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {bidregistry} from './auctionregistry';
import {auctionService} from './auction.service';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {auctionregistry } from './auctionregistry'


@Component({
	template:`<h3>  welcome to bid registration!!!</h3>
<div *ngIf="auction">
<form [formGroup]="form">
<div formgroupname="Bidregistry">
<div><label>AuctionId</label><input type='text' value={{auction.AutionId}} formControlName="id" disabled/></div>
<div><label>BiderName:</label><input type='text'  formControlName="bidername"/></div>
<div><label>BiderPrice:</label><input type='text' formControlName="biderprice"/></div>
<div><label>filedDay  :</label><input type='text' formControlName="fileday"/></div>
<button (click)="submit(form.value)">Submit</button>
</div>
</form>
</div>

 `,
 styles:[`
.div{
	padding :4px;
}
.label{
	padding-right: 20px;
  padding:20px;
  text-align: center;

}`]
})
  
export class Bidregistry implements OnInit{


public form:FormGroup;

 auction:any;
 editName: string;
 constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: auctionService,
    
  ) {}



  
  ngOnInit(){

this.form=new FormGroup({
 
id :new FormControl(''),
bidername:new FormControl(''),
biderprice:new FormControl(''),
fileday:new FormControl('')
});

    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.auction=this.service.getauctionById(id)

                    }); 
    
}



	bider:bidregistry;

   submit(bider:bidregistry){
       
      this.service.Bidregistry(bider,this.auction.AutionId);
   }


  
}
