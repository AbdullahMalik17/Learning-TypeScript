"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var prompt = require('prompt-syn')();
var name = prompt("What is yor name?");
var name2 = prompt("What is your father name");
console.log(chalk_1.default.underline.bgBlueBright(name, name2));
