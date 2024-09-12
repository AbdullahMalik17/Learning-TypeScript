import {input} from "@inquirer/prompts";
import { select } from "@inquirer/prompts"; 
async function calculator(){
let num1=await input({
    message:"Enter First Number:",
    validate: function(value) {
        const isValid = !isNaN;
        return isValid || 'Please enter a valid number';
    
}})
let num2=await input(
{
    message:"Enter Second Number:"
})
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
Number(num1)
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