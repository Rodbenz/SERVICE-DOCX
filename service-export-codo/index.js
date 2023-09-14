'use strict';
const express = require("express")

const condoExport = require('./routes/condo/condoExport');

const bodyParser = require('body-parser')
const cors = require('cors');

require("dotenv").config()
const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Enable CORS for requests from 'http://localhost:1234'
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
  // Other CORS-related headers can be set here if needed
  next();
});

app.use(cors({
  origin: 'http://localhost:1234'
}))

app.get("/",(req,res)=>{
  res.send("TRD Docx Genarator Service")
})

app.use('/condo', condoExport.routes);


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})