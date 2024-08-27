import inquirer from "inquirer";
let {guess} = await inquirer.prompt([{
    type:"number",
    name:"guess",
    message:"Enter a number to win a prize"
}])
let n=Math.random() 
let b=(n*10)
let c =Math.round(b)
Number(c)
if(guess===c){
    console.log("Congratulation , You on the burger .")
} else {
    console.log("Please try again")
}
 console.log(c)
