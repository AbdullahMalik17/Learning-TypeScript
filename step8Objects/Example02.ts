type name={
    firstname:string;
    lastname:string;
}
type userdetail={
    Name:name;
    Age:number;
    Class:string;
}
let Userdetail:userdetail={
    Name:{
        firstname:"Abdullah",
        lastname:"Athar"
    },
    Age:17,
    Class:"Eleven"
} 
//This is an example of type inside a type
// Another Example as folows:-
type population={
RateOfDeath:number;
RateOFBirth:number;
} 
type country={
    Name:string;
    Langauge:string;
    Religion:string;
    Population:population;
}
let Country:country={
    Name:"Pakistan",
    Langauge:"Urdu",
    Religion:"Islam",
    Population:{
        RateOFBirth:20,
        RateOfDeath:10
    }
}