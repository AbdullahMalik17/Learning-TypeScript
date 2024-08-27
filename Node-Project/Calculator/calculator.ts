import inquirer from "inquirer";
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
    console.log(num1+num2)
} else if(operation==="Substraction"){
    console.log(num1-num2)
}else if(operation==="Multiplication"){
    console.log(num1*num2)
} else{
    console.log(num1/num2)
}