'use strict';

const utils = require('../../utils');
const config = require('../../../config');
const sql = require('mssql');

const selDataExportcondo = async (req, res, next) => {
    let data = req.body;
    let dataObj = new Object();
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('/condo/DATA_REPORT');
        const result = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .input("CHANGWAT_CODE", sql.NVarChar(2), data.CHANGWAT_CODE)
        .input("AMPHUR_CODE", sql.NVarChar(10), data.AMPHUR_CODE)
        .query(sqlQueries.selDataExportCondo1);
        const result1 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .input("CHANGWAT_CODE", sql.NVarChar(2), data.CHANGWAT_CODE)
        .query(sqlQueries.selDataParcel);
        const result2 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataCondoBuild);
        const result3 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataBuildArea);
        const result3_3 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.setDataReport2_3);
        const result3_4 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.setDataReport2_4);
        const result4 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataNCondoRoom);
        const result5 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataSecuritySystemType1);
        const result6 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataSecuritySystemType2);
        const result7 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataNcondoLevel);
        const result8 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataNcondoService);
        const result9 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataNcodos);
        const result10 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataReport7);
        const result11 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataReport7_1);
        const result12 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataReport7_2);
        const result13 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataReport7_3);
        const result14 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataReport7_1_1);
        const result15 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataReport7_1_2);
        const result16 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataReport7_1_3);
        const result17 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataReport7_1_4);
        const result18 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataReport7_1_5);
        const result19 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selheaderReport9);
        const result20 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selDataReport9);
        const result21 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.selheaderReport13);
        const result22 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.setDataReport13);
        const result23 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.setDataReport14);
        const result24 = await pool.request()
        .input("CONDO_S_ID", sql.NVarChar(10), data.condosid)
        .query(sqlQueries.setDataReport15);

        dataObj.DETIALREPORT1 = result.recordset
        dataObj.PARCELREPORT1 = result1.recordset
        dataObj.DATACONDOBUILD = result2.recordset
        dataObj.DATACONDOBUILDAREA = result3.recordset
        dataObj.DATAREPORT2_3 = result3_3.recordset
        dataObj.DATAREPORT2_4 = result3_4.recordset
        dataObj.DATANCONDOROOM = result4.recordset
        dataObj.SECURITY1 = result5.recordset
        dataObj.SECURITY2 = result6.recordset
        dataObj.NCONDOLAVEL = result7.recordset
        dataObj.NCONDOSERVICE = result8.recordset
        dataObj.NCONDOS = result9.recordset
        dataObj.CONDOREPORT7 = result10.recordset
        dataObj.CONDOREPORT7_1 = result11.recordset
        dataObj.CONDOREPORT7_2 = result12.recordset
        dataObj.CONDOREPORT7_3 = result13.recordset
        dataObj.CONDOREPORT7_1_1 = result14.recordset
        dataObj.CONDOREPORT7_1_2 = result15.recordset
        dataObj.CONDOREPORT7_1_3 = result16.recordset
        dataObj.CONDOREPORT7_1_4 = result17.recordset
        dataObj.CONDOREPORT7_1_5 = result18.recordset
        dataObj.HEADERREPORT9 = result19.recordset
        dataObj.DATAPORT9 = result20.recordset
        dataObj.DATAPORT13 = result21.recordset
        dataObj.DATAPORT13_1 = result22.recordset
        dataObj.DATAPORT14 = result23.recordset
        dataObj.DATAPORT15 = result24.recordset
        return dataObj;
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    selDataExportcondo,

}