package main

import (
           "fmt"
           "bytes"
           "time"
           "encoding/json"
           "strconv"
           "github.com/hyperledger/fabric/core/chaincode/shim"
        pb "github.com/hyperledger/fabric/protos/peer" )


type auctionchaincode struct{

}

type seller struct
 {
    AutionId   string
	Sellername string 
	ItemName   string 
	Baseprice  int
	Qauntity   int 
	Dateofauction time.Time
	Lastdate time.Time
	Bid []buyer
    Isactive bool
}

type buyer struct{

	Buyername string 
    Pricefiled int 
    Fileddate time.Time
}
////main/////////////////

func main(){

	err:=shim.Start(new(auctionchaincode))
	if err !=nil{

		fmt.Printf("error while depolying chaincode-%s",err)

	}
}

func(t *auctionchaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println("Auctions chaincode is starting up")
	fmt.Println(" - ready for Auction items")
	return shim.Success(nil)
}

func (t *auctionchaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response{
     fmt.Printf("invoke")
  function,args:=stub.GetFunctionAndParameters();
    if function =="Init"{
   	  return t.Init(stub);
      }else if function == "auctionregistry"{
     return auctionregistry(stub,args)
       }else if function =="bidregistry"{
       	return bidregistry(stub,args)
       }else if function=="comparebid"{
       	return comparebid(stub,args)
       }else if function =="auctionlist"{
            return auctionlist(stub,args)
        }else if function =="auctionbyId"{
       	return auctionbyId(stub,args)
       }


     fmt.Println("Received unknown invoke function name -" + function)
	return shim.Error("Received unknown invoke function name -'" + function + "'")
}

func (t *auctionchaincode) Query(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println(" QUERY ");
	function, args := stub.GetFunctionAndParameters()
	if function == "cbv" {
		return comparebid(stub,args)	
	   }else if function =="auctionlist"{
            return auctionlist(stub,args)
        }else if function =="auctionbyId"{
       	return auctionbyId(stub,args)
       }

	fmt.Println("Received unknown query function name -" + function)
	return shim.Error("Received unknown query function name -'" + function + "'")
}



//////////registry for auction //////////////

func auctionregistry(stub shim.ChaincodeStubInterface, args []string) pb.Response {

    fmt.Printf("auction registry process.......")
     var buyerdetails []buyer
	if len(args) !=7{

		return shim.Error("All necessary details should be added for auctionregistry")
	} 
    
     autionId:=args[0]
    Sname:=args[1]
    ItemName:=args[2] 
	baseprice,err:=strconv.Atoi(args[3])
	qunatity,err :=strconv.Atoi(args[4]) 
	const shortForm = "2006-Jan-02"
	dateofauction,err := time.Parse(shortForm,args[5])
	lastdate,err1:=time.Parse(shortForm,args[6])


	Buyername:=args[1]
    pricefiled,err :=strconv.Atoi(args[3])
    fileddate,err:=time.Parse(shortForm,args[5])

	if err!= nil{
		return shim.Error("enter the date of auction exactly-"+err.Error())
	     }
	if err1!=nil{
		return shim.Error("enter the last date of auction exactly-"+err1.Error())
    	 }
     temp:=buyer{Buyername,pricefiled,fileddate}
     buyerdetails=append(buyerdetails,temp)

 auctiondetailscheck,err:=stub.GetState(autionId)
 if err != nil {
		fmt.Println("Registration Failed")
		return shim.Error("Failed to get auction details: " + err.Error())
	} else if auctiondetailscheck != nil {
		fmt.Println("This autionId  already registred: "+args[0])
		fmt.Println("Registration Failed")
		return shim.Error("This  aution Id already exists: " + args[0])
	}

seller:=seller{autionId,Sname,ItemName,baseprice,qunatity,dateofauction,lastdate,buyerdetails,false}
auctiondetailsmarshal,err:=json.Marshal(seller)
  if err!=nil {
  	fmt.Println("error occured while converting to json")
    return shim.Error(err.Error())
  }

 
 err=stub.PutState(autionId,auctiondetailsmarshal)
  if err!=nil{
  	return shim.Error(err.Error())
  }

getDetails(stub,args);
 return shim.Success(nil)
}

//Itimespan////
//	return check.After(start) && check.Before(end)
//}
func inTimeSpan(start, end, check time.Time) bool {
    return check.After(start) && check.Before(end)
}

/////bid registry for  auction////
func bidregistry (stub shim.ChaincodeStubInterface,args []string) pb.Response{

	fmt.Println("bid registry starts.........")
    if len(args)!=4{
    	return shim.Error("In correct arguments passed by bid ")
    }
   
     autionId:=args[0]
   auctiondetails,err:= stub.GetState(autionId)
	if err != nil {
		fmt.Println("auction Id  details Failed ")
		return shim.Error("Failed to get Auction details: " + err.Error())
	} else if auctiondetails == nil {
		fmt.Println(" auction Details not found "+args[0])
		fmt.Println(" updating bid to particular auction Failed ")
		return shim.Error("This auction  already exists: " + args[0])
	}

	auctiondetailsjson:=seller{}
	json.Unmarshal([]byte(auctiondetails),&auctiondetailsjson)
	var temp buyer
	var buyerdetails []buyer
	initialDetails :=auctiondetailsjson
    for i:=0; i<len(initialDetails.Bid);i++{
		buyerdetails = append(buyerdetails,initialDetails.Bid[i])
	}
	for i:=1;i<len(args);i+=4{
		fmt.Println(i)
	    Buyername:=args[i]
	    pricefiled,err :=strconv.Atoi(args[i+1])
	    const shortForm = "2006-Jan-02"
	    fileddate,err:=time.Parse(shortForm,args[i+2])
	    if err!= nil{
			return shim.Error("enter the date of auction exactly-"+err.Error())
		}
		if pricefiled <=auctiondetailsjson.Baseprice{
      return shim.Error("price value should be greater than auction price")
     }

 if !inTimeSpan(auctiondetailsjson.Dateofauction,auctiondetailsjson.Lastdate,fileddate){
 	return	 shim.Error("date of auction is over or the last date is finished please check and fill the form")
 }
	    temp=buyer{Buyername,pricefiled,fileddate}
	    buyerdetails=append(buyerdetails,temp)
	
}

/*   biddetailsget,err:=stub.GetState(bidId)
  if err != nil {
		fmt.Println("Registration Failed")
		return shim.Error("Failed to get bid details: " + err.Error())
	} else if auctiondetailscheck != nil {
		fmt.Println("This  bidId  already registred: "+args[0])
		fmt.Println("Registration Failed")
		return shim.Error("This  bid Id already exists: " + args[0])
	}*/
 

 
  auctioner:=seller{autionId,auctiondetailsjson.Sellername,auctiondetailsjson.ItemName,auctiondetailsjson.Baseprice,auctiondetailsjson.Qauntity,auctiondetailsjson.Dateofauction,auctiondetailsjson.Lastdate,buyerdetails,false}   
	auctionbidmarhal,err:=json.Marshal(auctioner)
	if err!=nil {
		fmt.Println("error occured while converting to json")
		return shim.Error(err.Error())
	}
 err=stub.PutState(autionId,auctionbidmarhal)
  if err!=nil{
  	return shim.Error(err.Error())
  }
	fmt.Println("you Successfull  auctioned for ....  :"+args[0])
	return shim.Success(nil)

}

func comparebid(stub shim.ChaincodeStubInterface,args []string) pb.Response{

     Current_date:=time.Now().Local()
     Current_date.Format("2006-Jan-02")
    
     autionId:=args[0]
       auctiondetails,err:= stub.GetState(autionId)
	if err != nil {
		fmt.Println("auction Id  details Failed ")
		return shim.Error("Failed to get Auction details: " + err.Error())
	} else if auctiondetails == nil {
		fmt.Println(" auction Details not found "+args[0])
		fmt.Println(" updating bid to particular auction Failed ")
		return shim.Error("This auction  already exists: " + args[0])
	}

	auctiondetailsjson:=seller{}
	json.Unmarshal([]byte(auctiondetails),&auctiondetailsjson)
	//var temp buyer

	if !Current_date.Before(auctiondetailsjson.Lastdate){
	


	var buyerdetails []buyer
	initialDetails :=  auctiondetailsjson
	for i:=0; i<len(initialDetails.Bid);i++{
		buyerdetails = append(buyerdetails,initialDetails.Bid[i])
		fmt.Println(initialDetails.Bid[i])
	}
     
j:=0
     maxprice:=buyerdetails[0].Pricefiled
     
     for i:=1;i<len(buyerdetails);i++{
  
		if maxprice < buyerdetails[i].Pricefiled{
			 maxprice=buyerdetails[i].Pricefiled
			j=i
		}    

 }
 
    buyername:=buyerdetails[j].Buyername 
    pricefiled:=buyerdetails[j].Pricefiled
    fileddate:=buyerdetails[j].Fileddate
 
     auctionfinshed:=seller{autionId,auctiondetailsjson.Sellername,auctiondetailsjson.ItemName,auctiondetailsjson.Baseprice,auctiondetailsjson.Qauntity,auctiondetailsjson.Dateofauction,auctiondetailsjson.Lastdate,initialDetails.Bid,true}
         
    auctiondetailsmarshal,err:=json.Marshal(auctionfinshed)
  if err!=nil {
  	fmt.Println("error occured while converting to json")
    return shim.Error(err.Error())
  }

 err=stub.PutState(autionId,auctiondetailsmarshal)
  if err!=nil{
  	return shim.Error(err.Error())
  }
 // bid1:=buyer{Buyername,pricefiled,fileddate1}
	//	marsh:=&response{
	//		id:1,
	//		bid:bid1}
	//		bidmarshal,err:=json.Marshal(marsh);
		
   if err!=nil {
		fmt.Println("error occured while converting to json")
		return shim.Error(err.Error())
	}

 var buffer bytes.Buffer
	buffer.WriteString("[")
  
 // var bid buyer
///o display the bid usefully placed memeber in auction list/////
  bidmarshal:=&buyer{Buyername:buyername,Pricefiled:pricefiled,Fileddate:fileddate}
    bidjson,_:=json.Marshal(bidmarshal)

	bArrayMemberAlreadyWritten := false

          if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
	 	buffer.WriteString(string(bidjson))
	    bArrayMemberAlreadyWritten = true
		buffer.WriteString("]")


   
   fmt.Println("the item belongs to higest bid is %s,%d",buyername,pricefiled)


   return shim.Success(buffer.Bytes()) 
    }

    var buffer bytes.Buffer
      	buffer.WriteString("[")
	 	buffer.WriteString("{")
		buffer.WriteString("Auction is not finished it still taking biding")
		buffer.WriteString("}")
		buffer.WriteString("]")

   return shim.Success(buffer.Bytes());  

     }

func auctionlist (stub shim.ChaincodeStubInterface,args []string) pb.Response {
	
  
  auctionlist:=[]seller{}
  id1:="a"+args[0]
  id2:="a"+args[1]

	// ---- Get All Marbles ---- //
	resultsIterator, err := stub.GetStateByRange(id1,id2)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		fmt.Println("on auction id - ", queryResponse.Key)
		var Seller seller 
		json.Unmarshal(queryResponse.Value, &Seller)   

                if Seller.Isactive == false {
           auctionlist = append(auctionlist, Seller)
                }

		                                             //un stringify it aka JSON.parse()
    	   //add this marble to the list
	
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")
  everythingAsBytes, _ := json.Marshal(auctionlist)             //convert to array of bytes
	
	fmt.Println(everythingAsBytes)
	fmt.Println(auctionlist)

	fmt.Printf("- getauctionlist queryResult:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}
func getDetails (stub shim.ChaincodeStubInterface, args []string) pb.Response {
	creator,err := stub.GetCreator()
	if err!=nil{
		return shim.Error(err.Error())
	}
	fmt.Println("creator : "+string(creator))
	/*signedProposal,err := stub.GetSignedProposal()
	if err!=nil{
		return shim.Error(err.Error())
	}
	fmt.Println(signedProposal)*/
	return shim.Success(nil)
}
	
func auctionbyId(stub shim.ChaincodeStubInterface,args []string)pb.Response {

 if len(args)!=1{
    	return shim.Error("In correct arguments passed by aucion Id is compulsory ")
    }
 autionId:=args[0]
       auctiondetails,err:= stub.GetState(autionId)
	if err != nil {
		fmt.Println("auction Id  details Failed ")
		return shim.Error("Failed to get Auction details: " + err.Error())
	} else if auctiondetails == nil {
		fmt.Println(" auction Details not found "+args[0])
		fmt.Println(" updating bid to particular auction Failed ")
		return shim.Error("This auction  already exists: " + args[0])
	}


	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
		var Seller seller 
			json.Unmarshal([]byte(auctiondetails),&Seller)

          if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
	  /*buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")
*/
//		buffer.WriteString(", \"Record\":")
		buffer.WriteString(string(auctiondetails))
		//buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
		buffer.WriteString("]")
 // everythingAsBytes, _ := json.Marshal(auctionlist)             //convert to array of bytes
	
	//fmt.Println(everythingAsBytes)
	//fmt.Println(auctionlist)

	fmt.Printf("- AuctionList of particular Id :\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())

	


	
}
