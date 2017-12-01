func register(stub shim.ChaincodeStubInterface, args []string) pb.Response {
    fmt.Println("Registration of student in process... ")
    var education []Education
    if len(args) !=7{
        return shim.Error("Incorrect number of arguments. Expecting 7. ID followed by details")
    }

    // input sanitation
    //err = sanitize_arguments(args)
    //if err != nil {
    //  return shim.Error(err.Error())
    //}
    id :=args[0]
    displayPicture :=args[1]
    name :=args[2]
    dob,err := time.Parse("2006-01-02", args[3])
    if err != nil {
        return shim.Error("3st argument must be a date string and should be in 2006-01-02 format")
    }
    gender :=strings.ToLower(args[4])
    if gender!="male" && gender!="female"{
        return shim.Error("Gender must be male or female in 4rd argument")  
    }
    email := args[5]
    profession := args[6]
    
    // To check if Id already exists
    DetailsAsBytes, err := stub.GetState(id)
    if err != nil {
        fmt.Println("Registration Failed")
        return shim.Error("Failed to get ID details: " + err.Error())
    } else if DetailsAsBytes != nil {
        fmt.Println("This Id already exists: "+args[0])
        fmt.Println("Registration Failed")
        return shim.Error("This Id already exists: " + args[0])
    }
    //Assinging to student json
    //education := Education{degree,board,institute,passOut,score}
    registerDetails := User{displayPicture,name,email,dob,gender,profession,education}
    DetailsJSONasBytes, err := json.Marshal(registerDetails)
    if err != nil {
        fmt.Println("error while Json marshal")
        return shim.Error(err.Error())
    }
    //write the variable into the ledger
    err = stub.PutState(id, DetailsJSONasBytes)
    if err != nil {
        return shim.Error(err.Error())
    }
    var str []string
    str = append(str,"1")
    //getHistory(stub,str)
    fmt.Println("Registration Successfull ---> Record created " )
    return shim.Success(nil)
}
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
type InformationChainCode struct {
}
func main() {
    err := shim.Start(new(InformationChainCode))
    if err != nil {
        fmt.Printf("Error while starting Information Chaincode - %s", err)
    }
}
type User struct{
    ProfilePic string `json:"profilePic"`
    Name string `json:"username"`
    Email string`jsin:"email"`
    DateOfBirth time.Time `json:"dateOfBirth`
    Gender string `json:"gender"`
    Profession string `json:"profession"`
    Education []Education `json:"education"`
}
type Education struct{
    Degree  string `json:"degree"`
    Board string `json:"board"`
    Institute string `json:"Institute`
    YearOfPassout int `json:"yearOfPassout"`
    Score   float64 `json:"score"`
}
type Profession struct{
    Organisation string `json:"organisation"`
    Designation string `json:"designation"`
    Location string `json:"location`
    DateOfJoining time.Time `json:"dateOfJoining"`
    DateOfRelieving time.Time `json:"dateOfRelieving"`
    Experience float64 `json:experience`
    StillWork bool `json:stilWorking`
}

