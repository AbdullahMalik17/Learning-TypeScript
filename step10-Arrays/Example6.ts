function greeting(Greeting:string,...Names:string[]){
    for(const name of Names){     // of is used to give the iterates of index .
        console.log(Greeting+ name)
    }
}
greeting("hello ","Abdullah","Haleema","Hamna","Amna")
