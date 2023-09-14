

// require("dotenv").config()

// const config = {
//     user:  process.env.DB_USER,
//     password:  process.env.DB_PASSWORD,
//     server: process.env.DB_HOSTNAME,
//     database:  process.env.DB_HOSTNAME,
//     port :  process.env.DB_PORT,
//     options: {
//         encrypt: true,
//         trustServerCertificate: true ,
//         enableArithAbort: true
//     }
// }

// module.exports = config
'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {PORT, HOST, HOST_URL, DB_USER, DB_PASSWORD, DB_NAME, DB_HOSTNAME} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(PORT, 'PORT is require');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: DB_HOSTNAME,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort: true
        },
    },
};