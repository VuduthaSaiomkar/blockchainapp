import { Component, OnInit } from '@angular/core';
import {auctionService} from '../auctionfolder/auction.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(
  	     private service: auctionService,
) { 

  }

  ngOnInit(){
  
}


submit(value:string){

	this.service.result(value);

  }

}
