import { number } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";
let account_number = await number({
    message: "Enter Your Account Number"
});
account_number ?? 0;
let Password = await number({
    message: "Enter Passsword "
});
Password ?? 0;
let account_type = await select({
    message: "Enter Account Type ",
    choices: ["Current Account", "Debbit Card"]
});
