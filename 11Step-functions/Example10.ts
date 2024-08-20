function CreateDate(days:number):Date;
function CreateDate(days:number,month:number,year:number):Date;
function CreateDate(days:number,month?:number,Year?:number):Date{
    return month===undefined||Year===undefined?
    new Date(days):new Date (Year,month-1,days)
}
// This is an example of Date.
 let dat=CreateDate(23)
 console.log(dat)