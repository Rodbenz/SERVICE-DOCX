'use strict';

const commonData = require('../data/common');


const getAllStatusId = async (req, res, next) => {
    try {
        const data = await commonData.getStatusId();
        res.send(data);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const insertSatatus = async (req, res, next) => {
    // console.log(req.body);
    try {
        const body = req.body;
        const data = await commonData.insertSata(body);
        res.send(data[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateSatatus = async (req, res, next) => {
    // console.log(req.body);
    try {
        const body = req.body;
        const data = await commonData.updataSata(body);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getEq_Location = async (req, res, next) => {
    console.log(req.body);
    try {
        const body = req.body;
        const data = await commonData.getEQ(body);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getEQUIPMENT_NO = async (req, res, next) => {
    console.log("555555555555555555 :"+req.params.id);
    try {
        const Id = req.params.id;
        const data = await commonData.getEQ_Id(Id);
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCountConfig = async (req, res, next) => {
    try {
        const data = await commonData.getCountConfig();
        res.send(data);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports ={
    getAllStatusId,
    insertSatatus,
    updateSatatus,
    getEq_Location,
    getEQUIPMENT_NO,
    getCountConfig

}