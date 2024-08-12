/*
Encaspsulation is used to restrict our data. For this purpose we use private keyword.
We use underscore before the variable name. Private data is unaccessible
*/
class Point{
    public name:string; 
    private _Pakistansecurity:string;
    constructor(name:string,_Pakistansecurity:string){
        this.name=name;
        this._Pakistansecurity=_Pakistansecurity
    }
}
let Pakistan=new Point("Weapon","Pakistan has 85 Atom bomb");
console.log(Pakistan);