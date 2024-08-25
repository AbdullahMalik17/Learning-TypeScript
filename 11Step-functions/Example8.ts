let nickname:string[]=["Abdullah","bidda","topper","rasgullah"]
function nicknames(callback:(index:number)=>string){  // We use this method in the callback 
    for (let i=0;i<nickname.length;i++){
        console.log(nickname[i])
    }
}
function callback(index:number){ //we return array in the callback function 
    return nickname[index]
}
nicknames(callback) // output
// Abdullah
// bidda
//  topper
// rasgullah
