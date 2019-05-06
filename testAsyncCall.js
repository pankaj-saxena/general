var fs =require('fs');

function resolveAfter2Second(user,timeout){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('resolved by user "'+user + '" in '+ timeout +' seconds');
        }
            ,timeout*1000);
        
    });
}


function showFile(filepath){
    return new Promise((resolve,reject)=>{
        var fdata = fs.readFile(filepath, function(err,data){
            if (err){
                reject(err);
            } else {
                resolve(data.toString());
            }

        }); 
    });

}

async function asyncCall(){
    let user='Caesar';
    let timeout=2; //in seconds
    let fPath = './data/invalid-response.json';
    console.log('calling...');
    var result = await resolveAfter2Second(user,timeout);
    console.log(result);
    try{
        result = await showFile(fPath);
        console.log(result);
    }catch(err){
        console.error(err);
    }
    

}


asyncCall()