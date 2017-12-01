import { Component, Inject } from '@angular/core';
import { Http,Headers,RequestOptions} from '@angular/http';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import {auctionService} from '../auctionfolder/auction.service';



@Component({
  selector: 'my-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

//orgs:string

  constructor(private service:auctionService){}


addContact(user ,orgs:any){

alert(user);

  this.service.addContact(user,orgs);
}

singleuser(user,orgs:any){
	alert(user);
	this.service.singleuser(user,orgs);

}
}
