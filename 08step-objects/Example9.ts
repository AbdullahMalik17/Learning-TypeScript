type e={
    name:string,
    father:string
}
type y={
    marks:number
}
type z=e&y   // interaction
let Z:z={
    name:"Abdullah",
    father:"Athar",
    marks:7
}