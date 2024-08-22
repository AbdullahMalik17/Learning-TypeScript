# Modules
Module is a file that containing high level import and export.
### Export 
 This is used to export a function . It's syntax as follows:-
  export function name(){

  }
## Import 
  It is is used to import function. It's syntax as follows:-
 import{Function-name} from "/.file-name"
### changing name of variable
We also change the name of variable while we impot it .
See example3 of import and export .
## Advantage 
It is used to separate a tasks.
## default keyword
default keyword is used to default the export . Each file has only one default export .
When we import the default variable , we don't use the curly braces.
## Import Anilus
we also change the name of import variable by using as keyword with name . 
## Changing in tsconfig.json
We change somethings in  tsconfig because our previous tsconfig make a difficult js file . Changes as follows:-

   "target":"es2022",
   "module":"NodeNext",
   "moduleResolution":"NodeNext"
## Changing in package.json
Some changes are as follows:-

   "type":"module"


  