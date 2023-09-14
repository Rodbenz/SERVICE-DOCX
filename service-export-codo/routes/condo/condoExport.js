'use strict';

const express = require('express');
const controllers = require('../../middleware/exportCondo');
const testDocxImage = require('../../middleware/testImage');
const router = express.Router();

router.post('/downLoad', controllers.expprtCondo);
router.get('/downLoadTestImage', testDocxImage);


module.exports = {
    routes: router
}