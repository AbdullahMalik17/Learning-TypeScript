class  inter{
    readonly num1:number=6;  // it is same as private.
    num2:number=7;
     constructor(num1:number,num2:number){    // if I give constructor then It demands arguments
        this.num1=this.num2
     }
     
}
let Inter=new inter(8,9)
