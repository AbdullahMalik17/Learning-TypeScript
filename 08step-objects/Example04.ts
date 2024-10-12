type bookbypoem={
    name:string,
    pages:number,
    rhymes?:boolean
}
type bookbyrhymes={
    name:string,
    pages?:number,
    rhymes:boolean
}
type book=bookbypoem|bookbyrhymes
let Book:book=Math.random()?{name:"Twinkle twinkle",pages:5}:{name:"Lakri ki kate",rhymes:true}
console.log(Book)
// This is a union of type.