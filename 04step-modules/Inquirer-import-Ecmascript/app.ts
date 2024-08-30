import inquirer from "inquirer";
async function age(){ 
let answer = await inquirer.prompt([
    {
     type:"input",
     name:"Age",
     message:"What is your age",
   }
 ])
}
age();