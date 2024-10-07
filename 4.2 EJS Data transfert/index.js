import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    sentence: "Please enter your name bellow"});
});

app.post("/submit", (req, res) => {
  const fName = req.body["fName"];
  const lName = req.body["lName"];
  const lgth = fName.length+lName.length;
  if(lgth === 0){
    res.render("index.ejs", {
      sentence: "Please enter your name bellow",
    }) 
  }else {
    res.render("index.ejs", {
      sentence: `Your name has ${lgth} characters`,
    }) 
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
