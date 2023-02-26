
const express = require('express'); // Importing express module
const db = require('./database');
const model = require('./model');
const methods = require("./methods");
const app = express(); // Creating an express object
  
const port = 8000;  // Setting an port for this application
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Starting server using listen function
app.listen(port, function (err) {
   if(err){
       console.log("Error while starting server");
   }
   else{
       console.log("Server has been started at "+port);
   }
})

app.get('/universities', methods.ensureToken, async function (req, res) {
    let universities = await db.getUniversities(10);
    let response = JSON.stringify(universities.rows);
    res.send(response);
});

app.post('/predict', methods.ensureToken, async function (req, res) {
    let predictMatchUniversity = await model.predictMatchUniversity((req.body))
    res.send(predictMatchUniversity)
});



// curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsbyIsImVtYWlsIjoiYXNkYXMiLCJpYXQiOjE2NzczMzQ3NjR9.2Oh_3bnq5iuFYC5MaiwoAL6-aeZnhRsTnZXbGFqPp-k" --data '{ "faculdade": "engenharia química","interesses": "grafeno, química orgânica","área de pesquisa": "química, enzimas, síntese orgânica, líquidos iônicos","curso": "mestrado","estado": "RS","realocação": "true","orcamento": "3000" }' "http://localhost:8000/predict"

// curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsbyIsImVtYWlsIjoiYXNkYXMiLCJpYXQiOjE2NzczMzQ3NjR9.2Oh_3bnq5iuFYC5MaiwoAL6-aeZnhRsTnZXbGFqPp-k" "http://localhost:8000/universities"


