import { number } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";
var account_number = await number({
    message: "Enter Your Account Number ...."
});
account_number ?? 0;
var Password = await number({
    message: "Enter Passsword ..."
});
Password ?? 0;
let account_type = await select({
    message: "Enter Account Type ",
    choices: ["Current Account", "Debbit Card"]
});
let Accounts = [[123, 909090], [456, 808080], [789, 707070]];
if (account_number === 123) {
    if (Password === 909090) {
        let Amount = await number({
            message: "Enter Your Amount Which You Want To Withdraw ..."
        });
    }
    else {
        console.log("Please Enter Correct Password");
    }
}
else if (account_number === 456) {
    if (Password === 808080) {
        let Amount = await number({
            message: "Enter Amount Which You want to withdraw ..."
        });
    }
    else {
        console.log("Please Enter Correct Password ... ");
    }
}
else if (account_number === 789) {
    if (Password === 707070) {
        let Answer = await number({
            message: "Enter Amount which you want to withdraw"
        });
    }
    else {
        console.log("Please  Enter Correct Password ...");
    }
}
else {
    console.log("Please Enter Corect Account Number");
}
