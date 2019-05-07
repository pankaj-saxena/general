
var fs =require('fs');
var filePath='./data/error.json';

console.log('This is a test service...');

function test1(num1,num2) {
    console.log('Input received. num1:%d, num2:%d', num1,num2);
    return num1+num2;f
}

function readFileNow(filePath) {            //read a file synchronously
    console.log('File path:%s',filePath);
    var data=fs.readFileSync(filePath);
    console.log('File Content:\n'+data);    
}

function readFileLater(filePath) {          //read a file asynchronously
    console.log('File path:%s',filePath);
    fs.readFile(filePath,function name(err,data) {
        if(err) {
            console.log('Error while reading file:\n'+err);            
        } else {
            console.log('File Content:\n'+data);
        }
    });       
}

function getError(errorMaster,errorCode){    
    for(var error of errorMaster){
        if (error.status == errorCode)
            return error;       
    }
}

function showErrorDetails(){
    const contents = fs.readFileSync(filePath);
    var errorMaster = JSON.parse(contents);
    console.log(errorMaster.error[0]);
    console.log(getError(errorMaster.error,503));
}

function iterateList(){
  var chars = ['a', 'b', 'c'];
  console.log(chars.length);
  chars.forEach(element => {
    console.log(element);
  });
}

function processEvent(){
    var evt = '{"magic":"atMSG","type":"DT","headers":null,"messageSchemaId":"87A672B0AA76C4DB0A30F50F4A9F848C","messageSchema":null,"message":{"data":{"CUSTOMER_ID":"14","FIRST_NAME":null,"LAST_NAME":"test2"},"beforeData":{"CUSTOMER_ID":"14","FIRST_NAME":null,"LAST_NAME":"test2"},"headers":{"operation":"UPDATE","changeSequence":"20190502181731000000000000000000197","timestamp":"2019-05-02T18:17:29.000","streamPosition":"00000000.01ab5068.00000001.0000.02.0000:88.67945.16","transactionId":"00000000000000000000000000120001","changeMask":"00","columnMask":"05","transactionEventCounter":1,"transactionLastEvent":true}}}';
    var evtMessae = JSON.parse(evt).message;
    var newRecord = evtMessae.data;
    var oldRecord = evtMessae.beforeData;
    var operation = evtMessae.headers.operation;
    console.log(newRecord);
    console.log(oldRecord);
    console.log(operation);
    
    var oCustomer =  {};
    oCustomer.id=newRecord.CUSTOMER_ID;
    oCustomer.clientID=newRecord.CUSTOMER_ID;
    oCustomer.firstName=newRecord.FIRST_NAME;
    oCustomer.lastName=newRecord.LAST_NAME
    
    
    if (newRecord.FIRST_NAME==oldRecord.FIRST_NAME)
        console.log('nothing changed in first name');
    if (newRecord.LAST_NAME==oldRecord.LAST_NAME)
        console.log('nothing changed in last name');
    
    console.log(oCustomer);
}

function getMyType()
{
    var myAge = '123a';
    if (typeof myAge != NaN){
        console.log('my age is correct and it is %d',myAge); 
    }  else {
     console.log('my age must be numeric');
    }
}

function processDate(){
    var dt = new Date();
    console.log(dt + ' reponse');
    console.log(dt.toJSON() + ' now');
}


                
/***********************************test the functions******************************/
//console.log('total amount:'+ test1(3,5));
//readFileNow(filePath);
//readFileLater(filePath);
//showErrorDetails();
//processEvent();
//getMyType();
//processDate();
