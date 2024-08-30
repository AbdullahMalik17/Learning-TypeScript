interface ball{
    diameter:number
}
interface sphere{
    diameter:number
}
let Ball:ball={
    diameter:5,
}
let Sphere:sphere={
    diameter:8,
}
Ball=Sphere;
Sphere=Ball;
// Itr is not matter the values are different.
interface tube{
    diameter:number,
    lenght:number
}
let Tube:tube={
diameter:6,
lenght:6
}
Ball=Tube // Ball is assignable to Tube but Tube is not assignable to Ball.
console.log(Ball)
// TypeScript is comparing each member in the type against
  // each other to verify their equality.
  // Fresh mean assign a value at a time of declaration .
  // Stale mean use a variable .
//////////////////////////////// Example of fresh
type x={
    id : number,[x:string]:any    // make a rest parameter . This is called index sgnature .
}
let Student:x={
    id:5,
    Fullname:"Abdullah Athar",
    marks:"1156"
} // this is allow in stale 

// case 2


