interface Person{
    name:string,
    age:number|string;
}
interface Address{
    address:string,
    city:string,
    jobTitle:string
}

interface Employee extends Person, Address {  // this is an example of extends
    jobTitle: string;
}

const employee: Employee = {
    name: "Abdullah",
    age: 17,
    address: "A-143, 9th Floor, Sovereign Corporate Tower",
    city: "Bahawalpur",
    jobTitle:"full stack developer"
};

console.log(employee);
export{}