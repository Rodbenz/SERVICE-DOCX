'use strict';
const express = require("express")

const docxapp3 = require('./routes/app3/docxapp3');

const bodyParser = require('body-parser')
const cors = require('cors');

require("dotenv").config()
const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Enable CORS for requests from 'http://localhost:1234'
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Other CORS-related headers can be set here if needed
  next();
});

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.get("/",(req,res)=>{
  res.send("TRD Docx Genarator Service")
})

app.use('/print', docxapp3.routes);


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})