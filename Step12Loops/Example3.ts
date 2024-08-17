// Example of nested loop.
 let firstname:string[]=["Abdullah ","Haleema ","Hamna ","Amna "];
 let lastname:string[]=["Athar"];
 let fullname:string[]=[]
 for(let i=0;i<firstname.length;i++){
    for(let j=0;j<lastname.length;j++){
    fullname.push(firstname[i]+lastname[j])
    }
 }
 console.log(fullname)    // output:[ 'Abdullah Athar', 'Haleema Athar', 'Hamna Athar', 'Amna Athar' ] 