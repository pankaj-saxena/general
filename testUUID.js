const uuid = require('uuid');
const getUuid = require('uuid-by-string')
const datetime = require('node-datetime');
 
//console.log(uuid.v4());
//console.log(getUuid('5462553'));
//console.log(getUuid('5462553'));

var dt =datetime.create();
var bizEvent = {}
var binding = {};
binding.key = getUuid("5462553");
binding.table = "tbf_rx";
binding.joiningTables = null;

var legacySorBindings = {};
var keys = [];
var key1 = {};
key1.key = "5462553",
key1.indexInKey = "0"
keys.push(key1);
legacySorBindings.keys= keys;
legacySorBindings.table =  "tbf_rx";
legacySorBindings.mutatedTable =  "tbf_rx";
legacySorBindings.mutatedKeys =  null;
legacySorBindings.joiningTables =  "";

bizEvent.eventTime = dt._created;
bizEvent.binding = binding;
bizEvent.legacySorBindings = legacySorBindings;
bizEvent.rawBusinessEvent = "";

//console.log(bizEvent);
//console.log(JSON.stringify(bizEvent));

var rawEventKey = {
    "table": "TBF0_RX_TRANSACTION",
    "op_type": "INSERT",
    "key": "59398000216"
  };

  var config = {
    "factTableNames":[
        {
        "table": "tbf0_Rx"
        }
    ],
  "dimensionTableNames":[
    {
    "primaryKeys":{
        "indexInKey": 0
    },
    "table": "tbf0_Rx",
    "mutatedTable": "tbf0_Rx_Transaction"
    }]    
};

const tabType = {FACT:"fact", DIM:"dimension", JOIN:"join"};

var found = null;
var tabName = "tbf0_RX";
console.log(tabName.toUpperCase());
config.factTableNames.forEach((element) =>{
  console.log(element.table.toUpperCase());
  if (element.table.toUpperCase() == tabName.toUpperCase()){
    found =tabType.FACT;
  }
} );

config.dimensionTableNames.forEach((element) =>{
  if (element.mutatedTable == tabName){
    found =tabType.DIM;
  }
} );

console.log(found);

var mykey = "5462553;CCHC";
console.log(3>2?"true":"false");