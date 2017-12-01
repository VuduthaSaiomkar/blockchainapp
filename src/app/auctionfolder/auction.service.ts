import {auctionregistry} from'./auctionregistry';
import { Injectable } from '@angular/core';
import {auctionlist} from './mockauctions';
import {LoginComponent} from '../login/login.component';
import {RegistryComponent} from '../registry/registry.component';
import { Http,Headers,RequestOptions,URLSearchParams} from '@angular/http';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';




@Injectable()
export class auctionService {
  
public channelname:string;
public token:string;
public CCname:string;
public headers1 = new Headers();
public Data:any ;
public data1:any;
public data2:any;

constructor(private http: Http){
  
}


singleuser(user,orgs:any){
  var names = {'username':'jim','orgName':'org1'}

this.http.post('http://localhost:4000/users',{'username':user,'orgName':orgs}).map(res=>res.json()).subscribe(data=>{


this.token=data.token;
  this.headers1.append('authorization','Bearer '+data.token);
  this.headers1.append('content-type', 'application/json');

})
}


  addContact(user,orgs:any){
  if(this.token != undefined){
    let options=new RequestOptions({headers:this.headers1})
    this.http.post('http://localhost:4000/channels/mychannel/chaincodes',{
        'chaincodeName':'mycc',
      'chaincodeVersion':'v2',
      'args':[]
      },options).subscribe(data=>{
        console.log("GOT DATA: ",data);
      this.CCname='mycc';
  //console.log('working .............')

    })
  }else{                                                                                                                                                                                                                                                                              
  
var names = {'username':'jim','orgName':'org1'}

this.http.post('http://localhost:4000/users',{'username':user,'orgName':orgs}).map(res=>res.json()).subscribe(data=>{


this.token=data.token;
 let headers= new Headers();
  headers.append('authorization','Bearer '+data.token);
  headers.append('content-type', 'application/json');
  let options=new RequestOptions({headers:headers})

this.http.post('http://localhost:4000/channels',{
  'channelName':'mychannel',
  'channelConfigPath':'../artifacts/channel/mychannel.tx'},options).subscribe(data=>{

let channelName='mychannel'
this.channelname='mychannel'
this.http.post('http://localhost:4000/channels/'+channelName+'/peers',{
  'peers': ['peer1','peer2']
  },options).subscribe(data=>{

this.http.post('http://localhost:4000/chaincodes',{
    'peers': ['peer1', 'peer2'],
  'chaincodeName':'mycc',
  'chaincodePath':'github.com/example_cc',
  'chaincodeVersion':'v2'
  },options).subscribe(data=>{

this.CCname='mycc';

this.http.post('  http://localhost:4000/channels/'+channelName+'/chaincodes',{
    'chaincodeName':'mycc',
  'chaincodeVersion':'v2',
  'args':[]
  },options).subscribe(data=>{

this.CCname='mycc';
//console.log('working .............')

})



})




})


})  
})
}

}

 Enable(value:auctionregistry){

 let headers= new Headers();
  headers.append('authorization','Bearer '+this.token);
  headers.append('content-type', 'application/json');
  let options=new RequestOptions({headers:headers})

let id ='a'+value.auctionid;

  this.http.post('  http://localhost:4000/channels/mychannel/chaincodes/mycc',{
    'chaincodeName':'mycc',
    'fcn':'auctionregistry',
  'args':[id,value.sellername,value.itemname,value.baseprice,value.quantity,value.dateofauction,value.lastdateofacution]
},options).subscribe(data=>{

console.log('working .............')

})

}

  getdetails(){
console.log("working")
let headers= new Headers();
  headers.append('authorization','Bearer '+this.token);
  headers.append('content-type', 'application/json');
   let options=new RequestOptions({headers:headers});
 
this.http.get('http://localhost:4000/channels/mychannel/chaincodes/mycc?peer=peer1&fcn=auctionlist&args=["0","9999999"]',options).subscribe(res=>{
    
  this.Data= res.json();
console.log(this.Data);
  });
 }
  

getkeys(){
  return this.Data;
}



  getauctionslist(): Promise<auctionregistry[]> {
    return Promise.resolve(auctionlist);
  }

  getauctionById(id: number):any{

  console.log("working.....",id)
   id.toString();

 for(let object in this.Data){

   if(this.Data[object].Record.AutionId ==id){

     alert("working ...............");

      this.data1=this.Data[object].Record;
  }


 }

  console.log(this.data1)
return this.data1;


     }


 Bidregistry(auction :any,id:any){

console.log(auction);
   id.toString();
  let headers= new Headers();
  headers.append('authorization','Bearer '+this.token);
  headers.append('content-type', 'application/json');
  let options=new RequestOptions({headers:headers});
 this.http.post('  http://localhost:4000/channels/mychannel/chaincodes/mycc',{
    'chaincodeName':'mycc',
    'fcn':'bidregistry',
  'args':[id,auction.bidername,auction.biderprice,auction.fileday]
},options).subscribe(data=>{

console.log('working .............')

})


 }

result(auctionId:any){

 auctionId.toString();

let headers= new Headers();
  headers.append('authorization','Bearer '+this.token);
  headers.append('content-type', 'application/json');
  let options=new RequestOptions({headers:headers});
 this.http.get('http://localhost:4000/channels/mychannel/chaincodes/mycc?peer=peer1&fcn=cbv&args=["'+auctionId+'"]',options).subscribe(data=>{

  alert(data);
  console.log(data);


})

}

}




/*import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
//import { Injectable } from '@angular/core';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';


/*export class auctionregistry{

constructor(public auctionId:number,public sellername :string,public itemname:string,
  public baseprice:number,public quantity:number,public dateofauction:string,
  public lastdateofacution:string){}
}
/*export class auction {
  constructor(public id: number, public name: string) { }
}

const HEROES = [
  new Hero(11, 'Mr. Nice'),
  new Hero(12, 'Narco'),
  new Hero(13, 'Bombasto'),
  new Hero(14, 'Celeritas'),
  new Hero(15, 'Magneta'),
  new Hero(16, 'RubberMan')
];*/
/*const autioners=[

new auctionregistry(1,'sai1','tv',450,1,'15-12-2017','15-08-2017'),
new auctionregistry(2,'sai2','watch',450,1,'15-12-2017','15-08-2017'),
new auctionregistry(3,'sai3','car',450,1,'15-12-2017','15-08-2017'),
new auctionregistry(4,'sai4','bike',450,1,'15-12-2017','15-08-2017'),
new auctionregistry(5,'sai5','laptop',450,1,'15-12-2017','15-08-2017'),
new auctionregistry(6,'sai6','mobile',450,1,'15-12-2017','15-08-2017')
];
/*{auctionId:2,sellername:'sai4',itemname:'vechile',baseprice:450,quantity:1,dateofauction:'15-12-2017',lastdateofacution:'15-08-2017'},
{auctionId:3,sellername:'sai3',itemname:'laoptop',baseprice:450,quantity:1,dateofauction:'15-12-2017',lastdateofacution:'15-08-2017'},
{auctionId:4,sellername:'sai2',itemname:'remote',baseprice:450,quantity:1,dateofauction:'15-12-2017',lastdateofacution:'15-08-2017'},
{auctionId:5,sellername:'sai1',itemname:'soundsystem',baseprice:450,quantity:1,dateofauction:'15-12-2017',lastdateofacution:'15-08-2017'},
{auctionId:6,sellername:'sai6',itemname:'phone',baseprice:450,quantity:1,dateofauction:'15-12-2017',lastdateofacution:'15-08-2017'},

]*/

/*@Injectable()
export class auctionservice {


  static nextauctionId=100;
  private auction$:BehaviorSubject<auctionregistry[]>=new BehaviorSubject<auctionregistry[]>(autioners);
  getauctionlist() { return this.auction$; }

  getauction(id: number | string){
    console.log(id);

    console.log('ehfbehjvdhxwnjbdjkhwnbfxgensfdsbhneeeeeeeeeeeeeeehndevekwjkddvwljk');
   let value= this.getauctionlist().map(autioners =>autioners.find(s => s.auctionId ===+id));
  
console.log(value);
return value;
  }
}*/