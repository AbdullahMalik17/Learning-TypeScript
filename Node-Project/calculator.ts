import inquirer from "inquirer";
let {num1,num2,operation}=await inquirer.prompt([{
    type:"number",
    name:"num1",
    message:"Enter First number...",
}
,
{
    type:"number",
    name:"num2",
    message:"Enter second number..."
},
{
    type:"list",
    name:"operation",
    choices:["Addition","Subtarction","Multiplication","Division"],
    message:"Enter the operation...."
}])
if(operation==="Addition"){
    console.log(num1+num2);
} else if(operation==="Subtraction"){
    console.log(num1-num2)
} else if (operation==="Multiplication"){
    console.log(num1*num2)
} else{
    console.log(num1/num2)
}

