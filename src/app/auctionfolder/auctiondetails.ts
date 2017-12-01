import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {bidregistry} from './auctionregistry';
import {auctionService} from './auction.service';
import {auctionregistry} from './auctionregistry';
import { Router } from '@angular/router';
import { Http,Headers,RequestOptions} from '@angular/http';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import {Pipe,PipeTransform} from '@angular/core'

@Component({
	template:`
         <ul class="auctions">
         <li *ngFor="let auction of data5" [class.selected]="auction===selectedauction"
         (click)="onselected(auction)">
         <span class="badge">{{auction.value.AutionId}}</span>{{auction.value.ItemName}}</li>
         </ul> 
         <button (click)="getdetails()">GetDetails</button>
<div *ngIf="selectedauction">
<h3> {{selectedauction.value.ItemName}} details!!!</h3>
<div><label>auctionId:</label>{{selectedauction.value.AutionId}}</div>
<div><label>Sellername:</label>{{selectedauction.value.Sellername}}</div>
<div><label>Baseprice :</label>{{selectedauction.value.Baseprice}}</div>
<div><label>quantity  :</label>{{selectedauction.value.Qauntity}}</div>
<div><label>Begin Date:</label>{{selectedauction.value.Dateofauction}}</div>
<div><label>End Date  :</label>{{selectedauction.value.Lastdate}}</div> 
<a [routerLink]="['/bidregistry', selectedauction.value.AutionId]">
 <button>BidIt</button>
 </a>
</div>

`,
  
    styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .auctions {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .auctions li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .auctions li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .auctions li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .auctions .text {
      position: relative;
      top: -3px;
    }
    .auctions .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})

export class auctiondetails implements OnInit{

public keys:any;
public value:any;
public data:any;
public data5:any;
 auctions:Observable<auctionregistry[]>;
 selectedId:number;
constructor(
    private service: auctionService,
    private route: ActivatedRoute,
    private router: Router,
    private http:Http,
  ) {}

public selectedauction:any;

	onselected(auction:any){
		this.selectedauction=auction;
	}

// getauctionslist(): void {
  //  this.service.getauctionslist().then(auctions=> this.auctions =auctions);
 // }

  ngOnInit() {
   // this.auctions = this.route.paramMap
     // .switchMap((params: ParamMap) => {
       // this.selectedId = +params.get('id');s
        //return this.service.getauctionslist();
      //});

  }
  onSelect(auction:auctionregistry ): void {
    this.selectedauction = auction;
  }

  bidit(id:any): void {
    this.router.navigate(['/bidregistry',id]);
  }
 
  getdetails():void{

  this.service.getdetails()
  setTimeout(()=>{
   this.value = this.service.getkeys();
   //   console.log(this.value[0].Record)
  },1100)
  
  setTimeout(()=>{
      let class1 =new editedauctionlist();
     this.data5=class1.transform(this.value);

       },1100)
 

  }



}
@Pipe({name:'keys'})

 export class editedauctionlist implements PipeTransform{

       transform(value:any):any{

        console.log("going .......")
        let keys=[];
       	for(let object in value){
      	//for (let key in value[object].Record){
             keys.push({value:value[object].Record})

                   	}

      

      // }

       return keys;

        }}
