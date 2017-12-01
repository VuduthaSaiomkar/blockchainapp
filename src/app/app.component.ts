import { Component ,Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { Http} from '@angular/http';
import {Subscription} from 'rxjs';



/*@Component({
  selector: 'app-root',
  template:``,
  styleUrls: ['./app.component.css'],
})
// <p>Value: {{ form.value | json }}</p>
*/

@Component({

selector:'my-app',
templateUrl:'./appDetails.html'
})
export class AppComponent {
 
 /*form:FormGroup;
}
enrolled:auctionregistry;



submit(value:auctionregistry){

	// this.enrolled.sellername=value.sellername;
	// this.enrolled.itemname=value.itemname;
	// this.enrolled.baseprice=value.baseprice;
	 console.log(value)
	//console.log(this.enrolled)
}

 /*constructor(@Inject(FormBuilder) fb:FormBuilder){
 	this.form=fb.group({
 			  sellername:['', Validators.minLength(3)],
 			  itemname:['', Validators.minLength(2)],
 		      baseprice:['', Validators.nullValidator],
 		      quantity:['', Validators.nullValidator],
 		      dateofauction:['',Validators.required],
 		      lastdateofacution:['',Validators.required]
              })

 
 } 
 /* registry: auctionregistry={
 
 sellername:'sai',
 itemname:'tv',
 baseprice:450,
 quantity:2,
 dateofauction:'12-05-2018',
 lastdateofacution:'18-05-2018'
  };*/

  
}

