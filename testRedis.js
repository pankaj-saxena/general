var redis = require("redis");
var bluebird = require("bluebird");

// Convert Redis client API to use promises, to make it usable with async/await syntax
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var rhost = "customerconsentcust.redis.cache.windows.net"; 
var rport = "6380";
var rpwd = "it+ORE+M4ahREMvsq2Q8xBkqyagU2P9QZ9CbH81kjjc=";


async function testCache() {

    // Connect to the Azure Cache for Redis over the SSL port using the key.
    var cacheConnection = redis.createClient(rport, rhost,
        {auth_pass: rpwd, tls: {servername: rhost}});
        
    // Perform cache operations using the cache connection object...

    let key = "691538";
    let value = {
        "DRUG_ID": "691538",
        "NDC_MFG": "10006",
        "PRODUCT_NAME_ABBR": "MAG-OXIDE 400MG TABLETS",
        "MFG_NAME_ABBR": "RUGBY",
        "PACKAGE_SIZE": "120",
        "PACKAGE_SIZE_UOM": "EA",
        "PACKAGE_QTY" : "1",
        "DEFAULT_SIG" : null,
        "DRUG_TYPE_CD" : "G",
        "SPECIALTY_DRUG_IND" : "Y",
        "MED_GUIDE_IND" : "D",
        "MED_GUIDE_FILENAME" : "none",
        "CONCENTRATION_NBR" : null,
        "CONCENTRATION_UNITS" : null,
        "GPI" : "48400020000310"
      };

    // Simple PING command
    console.log("\nCache command: PING");
    console.log("Cache response : " + await cacheConnection.pingAsync());

    // Simple get and put of integral data types into the cache
    //console.log("\nCache command: GET Message");
    //console.log("Cache response : " + await cacheConnection.getAsync("Message"));    

    //console.log("\nCache command: SET Message");
    //console.log("Cache response : " + await cacheConnection.setAsync(key,  JSON.stringify(value)));    

    // Demonstrate "SET Message" executed as expected...
    console.log("\nCache command: GET Message");
    console.log("Cache response : " + JSON.parse(await cacheConnection.getAsync(key)).GPI);    

    // Get the client list, useful to see if connection list is growing...
    //console.log("\nCache command: CLIENT LIST");
    //console.log("Cache response : " + await cacheConnection.clientAsync("LIST"));    
}


testCache();

