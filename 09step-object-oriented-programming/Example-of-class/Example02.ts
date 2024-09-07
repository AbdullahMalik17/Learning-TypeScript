class bolean{           // Because boolean is a keyword.
    x:boolean;
    y:boolean;
    constructor(x:boolean,y:boolean){
        this.x=x;
        this.y=y;
    }
    printxAndy(){
        console.log("Print X:"+this.x+"\nPrint Y"+this.y)   // This is method of object.
    }
}
let bool=new bolean(true,false)
bool.printxAndy()
console.log(bool)