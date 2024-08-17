let cleanestcities:string[]=["Lahore","Multan","Karachi","Bahawalpur"]
for (let i:number=0;i<cleanestcities.length;i++){
    if("Bahawalpur"===cleanestcities[i]){
        console.log("This is a cleanest city")
        break
    }
    else {
        console.log("This is not a cleanest city")
    }
}
