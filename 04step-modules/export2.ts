export let b:number=9; // we also export a variable
export let arr:string[]=["Abdullah","Haleema","Hamna","Amna"];
 export class introduction{
    name:string;
    age:string;
    constructor(name:string,age:string){
        this.name=name;
        this.age=age;
    }
} 
 export let student=new introduction("Abdullah","seven") // we also export the class 
