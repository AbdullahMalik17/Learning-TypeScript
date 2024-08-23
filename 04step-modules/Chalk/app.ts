import inquirer from "inquirer";
let answer = await inquirer.prompt([{
    type:"number",
    name:"Age",
    message:"What is your age?"
}])
console.log(chalk.bgBlue(answer.Age))