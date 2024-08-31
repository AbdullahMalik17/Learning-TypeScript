import { number } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";
async function calculator() {
    let num1 = await number({
        message: "Enter First Number:",
        validate: function (value) {
            const isValid = !isNaN;
            return isValid || 'Please enter a valid number';
        }
    });
    let num2 = await number({
        message: "Enter Second Number:"
    });
    var operation = await select({
        message: "Enter Operation That you want to perform:",
        choices: [
            { value: "Addition",
                name: "Addition"
            }, {
                value: "Subtraction",
                name: "Subtraction"
            }, {
                value: "Multiplication",
                name: "Multiplication"
            }, {
                value: "Division",
                name: "Diviion"
            }
        ]
    });
    if (operation === "Addition") {
        console.log("The Addition of two number is ", num1 + num2);
    }
}
calculator();
