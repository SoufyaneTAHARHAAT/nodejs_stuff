import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "sfox";
const yourPassword = "sfoxt";
const yourAPIKey = "d379938b-a117-4fbf-ad6b-d5af10684180";
const yourBearerToken = "9cfe3d0d-c969-474f-9400-b1137a5c87e3";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    console.log(response.data);
    res.render("index.ejs", {content: response.secret});
  }
  catch(error) {
    console.error("Error fetching Data", error.message);
    return res.status(500).send("Server Error");
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async(req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      }
    });
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    })
  }
  catch(error) {
    console.error("Error fetching Data",error.message);
    res.status(500).send("Internal server Error");
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async(req, res) => {
  try {
    const result = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    })
  }
  catch (error) {
    console.error("Error fetching Data for filter embarassment", error.message);
    return res.status(500).send("Internal Server error");
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async(req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/secrets/1", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      }
    });
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    })
  }
  catch (error) {
    console.error("Error fetching Data for filter embarassment", error.message);
    return res.status(500).send("Internal Server error");
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
