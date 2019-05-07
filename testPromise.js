function alert(message){
    console.log(message);
}
  
new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('done');
        //reject('error');
    },3000);
})
.finally(()=>{alert('Promise ready');})
.then(result=>{alert('Result:'+result);})
.catch(err =>{alert('Error:'+err);});


new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 5000); // (*)
  
  }).then(function(result) { // (**)
  
    alert(result); // 1
    return result * 2;
  
  }).then(function(result) { // (***)
  
    alert(result); // 2
    return result * 2;
  
  }).then(function(result) {
  
    alert(result); // 4
    return result * 2;
  
  }).catch(err=>{alert(err);});
 
/*
Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).catch(alert); // Error: Whoops!
  */

async function sayHello(user){
    const name = 'poli';    
    return 'Hewllo ' + user + '...!!!';
}

sayHello('Adam')
.then(alert)
.catch(alert);



function f(msg) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(msg+"...done!"), 5000)
    });
    
}
  
async function waitForMe(){
    let result = await f('hello caesar'); // wait till the promise resolves (*)  
    alert(result); // "done!"
}

waitForMe();