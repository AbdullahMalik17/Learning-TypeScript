// get and set are the function of encapsulation . 
let acc =[["Abdullah",5172],["haleema",6777]] 
class bank{
      account1:string;
      password1:(number|string)
      constructor(account1:string,password1:(number|string)){}
     get name(){
        return this.account1=this.account1;
        return this.password1=this.password1;
     }
     set name(newname){
        if(acc[0][1]&&(this.account1==="Abdullah")){
           this.password1=777;
        } else {
            this.password1=888;
        }
     }
}
let Bank=new bank("haleema","hhhh")
console.log(Bank.password1)

