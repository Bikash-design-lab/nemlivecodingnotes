/// Install -> then import --> then use 

var isEven = require('is-even');
console.log(isEven(0));
console.log(isEven('1'))

// const fs = require("fs");
// //console.log(process.argv[2])
// let command = process.argv[2];
// let filePath =  process.argv[3];
// if(command=="read"){
//     let data = fs.readFileSync(filePath, "utf-8");
//     console.log(data)
// }
// if(command=="write"){
//     let data = process.argv[4]
//     fs.writeFileSync(filePath,data);
//     console.log(`Data written in ${filePath} file`)
// }
// if(command =="append"){
//     let data = process.argv[4]
//     fs.appendFileSync(filePath,data);
//     console.log(`Data appended in ${filePath} file`)
// }
/// Read a file
/// 1. Async Read
/// 2. Sync Read

/// 1.Async Read

// console.log("This is before read")
// try{
//     let data = fs.readFileSync("./data.txt", "utf-8");
//     console.log(data)
// }catch(err){
//     console.log("Error in Reading File")
// }
// console.log("after read, read process ended")
// fs.readFile("./data1.txt", "utf-8",(err,data)=>{
//     if(err){
//         console.log("Error in Reading File")
//     }else{
//         /// no err, data found
//         console.log("Data Found")
//         console.log(data)
//     }
// })

// fs.appendFileSync("./data.txt", "\n This is first message to be written in the file \n");
// console.log("Data written to the file")

// fs.unlinkSync("./data.txt");
// console.log("File Unlinked")

// fs.appendFileSync("./data.txt", "This is first line")
// console.log("Data written")
