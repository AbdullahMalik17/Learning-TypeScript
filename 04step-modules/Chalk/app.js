import chalk from "chalk";
import inquirer from "inquirer";
let answer = await inquirer.prompt([{
    type:"number",
    name:"Age",
    message:"What is your age?"
},
])
console.log(chalk.italic("You will also become 60 after "+(60-answer.Age)));