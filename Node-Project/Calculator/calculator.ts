import inquirer from "inquirer";
import { sum,sub,div,mul } from "./function.js"; 
let {num1,num2,operation}=await inquirer.prompt([{
    type:"number",
    name:"num1",
    message:"Enter First Number ...."
},
{
    type:"number",
    name:"num2",
    message:"Enter Second Number ...."
}
,{
    type:"number",
    name:"operation",
    message:"Enter operation ....",
    choices:["Addition","Subtraction","Division","Multiplication"]
}])
if (operation==="Addition"){
    console.log("The addition of their numbers is ",sum(num1,num2))
} else if(operation==="Substraction"){
    console.log("The subtraction of their number is ",sub(num1,num2))
}else if(operation==="Multiplication"){
    console.log("The multiplication of their number is ",mul(num1,num2))
} else{
    console.log("The division of their number is ",div(num1,num2))
}