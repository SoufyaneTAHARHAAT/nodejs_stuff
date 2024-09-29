console.log('I hope this goes well !');
const fs = require("fs");

// fs.writeFile("message.txt", "I hope this goes well also 2!", (error) => {
//     if(error) throw error;
//     console.log("Changes saved successfully !");
// });

fs.readFile("./message.txt","utf8", (error, data) => {
    if(error) throw error;
    console.log(data);
});

