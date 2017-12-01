import { PipeTransform,Pipe} from '@angular/core';

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
