'use strict';

const express = require('express');
const commonControll = require('../controllers/commonController');

const router = express.Router();

router.get('/common/getAllStatusId/', commonControll.getAllStatusId);
router.post('/common/insertSatatus/', commonControll.insertSatatus);
router.post('/common/updateSatatus/', commonControll.updateSatatus);


module.exports = {
    routes: router
}
