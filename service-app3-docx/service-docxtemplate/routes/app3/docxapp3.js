'use strict';

const express = require('express');
const DocxPrint = require('../../middleware/app3');
const router = express.Router();

router.post('/downLoadPrint', DocxPrint);


module.exports = {
    routes: router
}