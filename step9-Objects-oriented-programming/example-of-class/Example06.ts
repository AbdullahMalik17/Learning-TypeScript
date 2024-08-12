//  Polymorphism in programming gives a program the ability to redefine methods for derived classes.
class countr{
    public name:string;
    public currency:string;
    public language:string;
    constructor(name:string,currency:string,language:string){
        this.name=name;
        this.currency=currency;
        this.language=language;
    }
    public greeting(){
        console.log("Hello")
    }
}
class derive extends countr{
    constructor(name:string,currency:string,language:string){
    super(name,currency,language)
    }
    public greeting(){
        console.log("Assalam-o-Alaikum");
    }
}