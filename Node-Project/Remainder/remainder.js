import { number } from "@inquirer/prompts";
async function remainder() {
    var a = await number({
        message: "Enter a number that is divisilble by 2 "
    });
    a = a ?? 0;
    var b = a % 2;
    if (b == 0) {
        console.log("yes , " + a + " is divisible by 2");
    }
    else {
        console.log("No , " + a + "is not divisible by 2");
    }
}
remainder()
