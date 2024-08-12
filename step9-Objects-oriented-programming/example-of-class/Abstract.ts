// We don't put any significant value
abstract class country{
    public name:string;                                 
    public language:string;                             
    public population:number;
    public populationrate:number; // Fixed the Property type
constructor(
    name:string,                                             
    language :string,                             
    population:number,
    populationrate:number //Fixed the parameter name
){
    this.name = name;
    this.language = language;
    this.population = population;
    this.populationrate = populationrate;
}
// We add a more value
public abstract populationGrowthRate():number;
}
/*
 Constructor function helps us to give the value of object , when we write about it
*/
// We extend the Islamic country with contry
class OIC extends country{
    constructor(
      name:string,
      language:string,
      population:number,
      populationrate:number   
    ){
        super(name,language,population,populationrate);       //super function is just the renaming of constructor  
        
        }
        public populationGrowthRate(): number {
            this.population=this.population *this.populationrate
            return this.population      
    }
}
let pakistan = new OIC("Pakistan","Urdu",100000000,3.4)  // new is used to make an object.
pakistan.populationGrowthRate()
console.info(pakistan);
