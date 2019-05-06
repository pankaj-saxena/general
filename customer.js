var express = require('express');
var config = require('config');
var createError = require('http-errors');
var error = require('../error/error');
var customerRouter = express.Router();

const CosmosClient = require('@azure/cosmos').CosmosClient;

//read configuration of cosmos db
const endpoint = config.get('cosmosdb.endpoint');
const masterKey = config.get('cosmosdb.primaryKey');
const databaseId = config.get('cosmosdb.database.id');
const containerId = config.get('cosmosdb.container.id');

async function connnectAuthorizeService(authToken){
  return new Promise((resolve,reject)=>{
    const api_key =config.get('api_key');
    if (authToken == api_key){
      resolve(error.HttpStatusCodes.OK);
    } else {
      reject(createError(error.HttpStatusCodes.UNAUTHORIZED));
    }
  }); 
}


 async function getCustomerDetail(id) {    
    let idStr = String(id);
    const querySpec = {
        query: "SELECT  * FROM Customers c WHERE c.clientID = @id",        
        parameters: [ {
                name: "@id",
                value: idStr
            } ]      
    };   
   
    try {
      const client = new CosmosClient({ endpoint: endpoint, auth: { masterKey: masterKey } });
      //execute search query
      const results =  await client.database(databaseId).container(containerId).items.query(querySpec).toArray();
      return results;     
   }catch (err){
     console.log('Backend error while fetching customer details. Error:' + err); 
     throw(createError(error.HttpStatusCodes.BACKENDERROR)) ;    
   }      
 }  

 
customerRouter.get('/:customerID',   async function(req, res, next) {  
  var responseString = ''; 
  try {
  let authResponse = await connnectAuthorizeService(req.headers['authorization']);
  if(authResponse == error.HttpStatusCodes.OK){
    var custID= req.params.customerID;  
    if (!isNaN(custID)) {   
      
      var customerDetail=  await getCustomerDetail(custID);  
      if(customerDetail !=null & customerDetail.result !=null & customerDetail.result[0]!=null){
        responseString = '{ "customerID" : "' + customerDetail.result[0].clientID + '", "firstName" : "' + customerDetail.result[0].firstName + '", "lastName": "' + customerDetail.result[0].lastName + '"}'; 
        res.status(error.HttpStatusCodes.OK);     
      }else{        
        responseString = error.getError(error.HttpStatusCodes.NOTFOUND);
        res.status(error.HttpStatusCodes.NOTFOUND);
        } 
    } else{      
      responseString = error.getError(error.HttpStatusCodes.INVALIDREQ);
      res.status(error.HttpStatusCodes.INVALIDREQ); 
    }
  }  
  res.set('Content-Type', 'application/json');
  res.send(responseString);
}catch(err) { 
    console.log('Error while fetching customer details. Error:'+  err.status);    
    if(err.status == error.HttpStatusCodes.UNAUTHORIZED){
      responseString = error.getError(error.HttpStatusCodes.UNAUTHORIZED);
      res.status(error.HttpStatusCodes.UNAUTHORIZED); 
     } else if(err.status == error.HttpStatusCodes.BACKENDERROR){
      responseString = error.getError(error.HttpStatusCodes.BACKENDERROR);
      res.status(error.HttpStatusCodes.BACKENDERROR); 
    } else {
      responseString = error.getError(error.HttpStatusCodes.GENERICERROR);
      res.status(error.HttpStatusCodes.GENERICERROR);        
    }
    res.set('Content-Type', 'application/json');
    res.send(responseString);
   
  }
});

module.exports = customerRouter;
