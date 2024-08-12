// This is an example of inheritance
class state{
    public name:string;
    public language:string
    constructor(name:string,language:string){
        this.name=name;
        this.language=language;
    }
}
class states extends state{
    
    constructor(name:string,language:string){

     super(name,language)
    }
    
}

