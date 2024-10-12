import {number} from "@inquirer/prompts";
import { select } from "@inquirer/prompts"; 
async function calculator(){
let num1:number|undefined=await number({
    message:"Enter First Number:"

})
num1=num1??0;

let num2:number|undefined=await number(
{
    message:"Enter Second Number:"
})
num2=num2??0;  
var operation=await select({
    message:"Enter Operation That you want to perform:",
    choices:[
        {value:"Addition",
        name:"Addition"
    },{
        value:"Subtraction",
        name:"Subtraction"
    },{
        value:"Multiplication",
        name:"Multiplication"
    },{
        value:"Division",
        name:"Diviion"
    }
    ]
})

Number(num2)
Number(num2)

if(operation==="Addition"){
    console.log("The sum of two number is ",num1+num2)
}else if(operation==="Subtraction"){
    console.log("The subtraction of two number is ",num1-num2)
}else if(operation==="Multiplication"){
    console.log("The multiplication of two number is ",num1*num2)
} else{
    console.log("The Divion of two number is ", num1/num2)
}
}

calculator()