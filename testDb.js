const CosmosClient = require('@azure/cosmos').CosmosClient;

//read configuration of cosmos db
const endpoint = "https://consent-pref-db.documents.azure.com:443/";
const masterKey = "Rd4P91YZy3K4RZQOWackQbQGSIMX37LlpLR4LXyx4UQ2gIRV6L4UCExBRULEecAty3NZPwGPNO649TObLfLytw==";
const databaseId = "harmony";
const containerId = "prescriptions";

const customers = { PS:5892, GD:7658, BM:6512,IY: 5648 };
var evt = '{"magic": "atMSG", "type": "DT", "headers": null, "messageSchemaId": "87A672B0AA76C4DB0A30F50F4A9F848C", "messageSchema": null, "message": {"data": {"CUSTOMER_ID": "14", "FIRST_NAME": null, "LAST_NAME": "test2"}, "beforeData": {"CUSTOMER_ID": "14", "FIRST_NAME": null, "LAST_NAME": "test2"}, "headers": {"operation": "UPDATE", "changeSequence": "20190502181731000000000000000000197", "timestamp": "2019-05-02T18:17:29.000", "streamPosition": "00000000.01ab5068.00000001.0000.02.0000:88.67945.16", "transactionId": "00000000000000000000000000120001", "changeMask": "00", "columnMask": "05", "transactionEventCounter": 1, "transactionLastEvent": true}}}';
var evtMessae = JSON.parse(evt).message;
var newRecord = evtMessae.data;

var oCustomer =  {};
oCustomer.id=newRecord.CUSTOMER_ID;
oCustomer.clientID=newRecord.CUSTOMER_ID;
oCustomer.firstName=newRecord.FIRST_NAME;
//oCustomer.lastName=newRecord.LAST_NAME
//console.log(oCustomer);
//console.log(oCustomer.firstName);
//console.log(oCustomer.lastName);

async function queryContainer(id) {
  console.log(`Querying container:\n${containerId}`);
  let idStr = String(id);
  // query to return all children in a family
  const querySpec = {
     query: "SELECT  * FROM prescriptions c WHERE c.prescriberId = @prescriberId",
     parameters: [
         {
             name: "@prescriberId",
             value: idStr
         }
     ]
 };
 const client = new CosmosClient({ endpoint: endpoint, auth: { masterKey: masterKey } });
 const { resources } = await client.database(databaseId).container(containerId).items.query(querySpec).fetchAll();
 for (var queryResult of resources) {
     let resultString = JSON.stringify(queryResult);
     console.log(`\tQuery returned ${resultString}\n`);
 }
}

async function getCustomerDetail(id) {    
  console.log(`Querying container:\n${containerId}`);
    let idStr = String(id);
    const querySpec = {       
        query: "SELECT  * FROM prescriptions c WHERE c.prescriberId = @id",        
        parameters: [ {
                name: "@id",
                value: idStr
            } ]      
    };   
   
    try {
      const client = new CosmosClient({ endpoint: endpoint, auth: { masterKey: masterKey } });
     
      //execute search query
      const results =  await client.database(databaseId).container(containerId).items.query(querySpec).toArray();
      console.log(results.result.length + ' record found with client id:'+idStr);
      console.log(results.result[0]);
      //await client.database(databaseId).container(containerId).item(results.result[0].id).delete();
      //processRecord(results.result[0],oCustomer);
      
   }catch (err){
     console.log('Backend error while fetching customer details. Error:' + err); 
     throw(createError(500));
   }
}

function processRecord(recordDB,recordEvt){
  var oCustomerDB = {};
  oCustomerDB.id=recordDB.id;
  oCustomerDB.clientID=recordDB.clientID;
  oCustomerDB.firstName=recordDB.firstName;
  oCustomerDB.lastName=recordDB.lastName;

  console.log(oCustomerDB);
  console.log(recordEvt);
}

//getCustomerDetail(customers.PS);
//getCustomerDetail(1220049442);
queryContainer(59398000216);