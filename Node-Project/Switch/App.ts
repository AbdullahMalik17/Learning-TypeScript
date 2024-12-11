import { number} from "@inquirer/prompts";
async function main(){
let num5 = await number({
    message:"Enter a Number between 1-7 . "
}) 
switch(num5) {
    case 1:
        console.log("Today Monday")
        break;
    case 2:
        console.log("Today Tuesday")
        break;
    case 3:
        console.log("Toady Wednesday")
        break;
    case 4:
        console.log("Today Thursday")
        break;
    case 5:
        console.log("Today Friday")
        break;
    case 6:
        console.log("Today Saturday")
        break;
    case 7:
        console.log("Today Sunday ")  
        break;
    default:
        console.log("Enter a correct number")                      
}
}
main()