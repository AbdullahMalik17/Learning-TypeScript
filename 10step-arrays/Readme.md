# Array 
In JavaScript , we put all types of data that is useless to use .
In TypeScript , we made an array of same type.
## Assigning a type
It's Syntax as follows:-

     array-name:type[]=[values of array]

### Error 
If we put any other type of data , then it will give an error.
## Union type array.
I we want to give thre specific type of data in array , so we use union type. to see the example of it , see example3.ts
## Type of member of Array
The type of member of array is equal to the type of array . If array has union type , then the memberhas union type.
## Spread Operator
It is spread the two array . It's example in the Example5.ts . Basically , it is used in copy a object array or variable.
## Rest Parameter 
Rest is mostly used in function parameter. It is used in function when we don't know how many input in function . It makes the array of input. See Example6.ts
## to pull  
We add multiple element in the array but in to pull we add the specific number of array.See Example7.ts
We also make the to pull of variable.See Example8.ts 
## join method
It is used to join each index with input (input means that value which we enter in the parenthesis .)