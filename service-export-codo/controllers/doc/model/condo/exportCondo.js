const datareport = require("../../../../data/condo/DATA_REPORT")
const { setDataParcelReport1, setDataCondoBUildReport2, setDataCondoBUildAreaReport2, setDataNCondoRooom, setDataNCondoLevel, setDataNCondos, setDataCondos7, setDataCondos7_1, setDataCondos7_2, setDataCondos7_3, setDataCondos71, setDataCondos72, setDataCondoFull } = require("../../../../js/setDatas")
const { setDataReport2_3, setDataReport2_4, setDataReport9, setDataReport9_1, setHeaderReport9_1, setDataReport9_2, setHeaderReport13, setDataReport13_1, setDataReport14, setDataReport15 } = require("../../../../js/setDatas2")

const modelExportCondo = async (req, res, next) => {
    let data = await datareport.selDataExportcondo(req, res, next)
    dataReturn = modelData(data)
    return dataReturn
}

const modelData = async (data) => {
    // console.log(data, "modelData")
    if (!data) return null
    if (Array.isArray(data.DETIALREPORT1)) {
        if (data.length == 0) return null
    }
    // set data report 1
    let checkbox1 = data.DETIALREPORT1[0].CONDO_QUALITY == "ดี" ? String.fromCharCode(9745) : String.fromCharCode(9744);
    let checkbox2 = data.DETIALREPORT1[0].CONDO_QUALITY == "ปานกลาง" ? String.fromCharCode(9745) : String.fromCharCode(9744);
    let checkbox3 = data.DETIALREPORT1[0].CONDO_QUALITY == "พอใช้" ? String.fromCharCode(9745) : String.fromCharCode(9744);
    let address = `${data.DETIALREPORT1[0].ADDRESS} ${data.DETIALREPORT1[0].ROAD_NAME}`;
    let TRAIN = `${data.DETIALREPORT1[0].S_TRAIN_TYPE} ${data.DETIALREPORT1[0].S_TRAIN}`;

    let ownership = "";
    let titleReg = "";
    if (data.DETIALREPORT1[0].TITLE_REG == "บริษัทจำกัด") {
        titleReg = "จำกัด";
    } else if (data.DETIALREPORT1[0].TITLE_REG == "บริษัทจำกัด (มหาชน)") {
        titleReg = "จำกัด (มหาชน)";
    } else {
        titleReg = "";
    }
    if (data.DETIALREPORT1[0].REGIST_NAME_TYP == "นิติบุคคล") {
        ownership = `บริษัท ${data.DETIALREPORT1[0].FNAME_REG} ${titleReg}`;
    } else if (data.DETIALREPORT1[0].REGIST_NAME_TYP == "บุคคลธรรมดา") {
        ownership = `บริษัท ${data.DETIALREPORT1[0].FNAME_REG} ${titleReg}`;
    }
    let arrayParcel = await setDataParcelReport1(data.PARCELREPORT1);
    let arrayCondoBuild = await setDataCondoBUildReport2(data.DATACONDOBUILD);
    let arrayCondoBuildArea = await setDataCondoBUildAreaReport2(data.DATACONDOBUILDAREA);
    let array2_3 = await setDataReport2_3(data.DATAREPORT2_3);
    let array2_4 = await setDataReport2_4(data.DATAREPORT2_4);
    let arrayNCondoRoom = await setDataNCondoRooom(data.DATANCONDOROOM);
    let arrayNCondoLevel = await setDataNCondoLevel(data.NCONDOLAVEL);
    let arrayNCondos = await setDataNCondos(data.NCONDOS);
    let arrayCondos7 = await setDataCondos7(data.CONDOREPORT7);
    let arrayCondos7_1 = await setDataCondos7_1(data.CONDOREPORT7_1);
    let arrayCondos7_2 = await setDataCondos7_2(data.CONDOREPORT7_2);
    let arrayCondos7_1_2 = arrayCondos7_1.concat(arrayCondos7_2);
    let arrayCondosFull = await setDataCondoFull(arrayCondos7_1_2);
    let arrayCondos7_3 = setDataCondos7_3(data.CONDOREPORT7_3);
    let arrayCondos71 = await setDataCondos71(data.CONDOREPORT7_1_1, data.DETIALREPORT1[0].CONDO_NAME, data.CONDOREPORT7_1_2, data.CONDOREPORT7_1_3, data.CONDOREPORT7_1_4);
    let arrayCondos72 = await setDataCondos72(data.CONDOREPORT7_1_1, data.DETIALREPORT1[0].CONDO_NAME, data.CONDOREPORT7_1_5, data.CONDOREPORT7_1_3, data.CONDOREPORT7_1_4);

    let res9 = await setDataReport9(data.DATACONDOBUILD);
    let res9_1 = await setDataReport9_1(data.DATAREPORT2_3);
    let res9_2 = await setHeaderReport9_1(data.HEADERREPORT9);
    let res9_3 = await setDataReport9_2(data.DATAPORT9);
    let res13 = await setHeaderReport13(data.DATAPORT13);
    let res13_1 = await setDataReport13_1(data.DATAPORT13_1);
    let res14 = await setDataReport14(data.DATAPORT14);
    let res15 = await setDataReport15(data.DATAPORT15);


    let model = {
        CONDO_NAME: data.DETIALREPORT1[0].CONDO_NAME ? data.DETIALREPORT1[0].CONDO_NAME : "",
        ALLROOM: data.DETIALREPORT1[0].ALLROOM ? data.DETIALREPORT1[0].ALLROOM : "",
        CONDO_TYPE_NAME: data.DETIALREPORT1[0].CONDO_TYPE_NAME ? data.DETIALREPORT1[0].CONDO_TYPE_NAME : "",
        checkbox1: checkbox1,
        checkbox2: checkbox2,
        checkbox3: checkbox3,
        CONDO_QUALITY: data.DETIALREPORT1[0].CONDO_QUALITY ? data.DETIALREPORT1[0].CONDO_QUALITY : "",
        ADDRESS: address,
        MAIN_ROAD_NAME: data.DETIALREPORT1[0].MAIN_ROAD_NAME ? data.DETIALREPORT1[0].MAIN_ROAD_NAME : "",
        MAIN_ROAD_DISTANCE: numberWithCommas(data.DETIALREPORT1[0].MAIN_ROAD_DISTANCE),
        S_TRAIN_TYPE: TRAIN,
        S_TRAIN_DISTANT: numberWithCommas(data.DETIALREPORT1[0].S_TRAIN_DISTANT),
        NAMETH: data.DETIALREPORT1[0].NAMETH ? data.DETIALREPORT1[0].NAMETH : "",
        AMPHUR_NAME: data.DETIALREPORT1[0].AMPHUR_Name ? data.DETIALREPORT1[0].AMPHUR_Name : "",
        OWNNERSHIP: ownership,
        tablereport1: arrayParcel.TABLEREPORT1,
        TABLERESUMAREAPORT1: arrayParcel.TABLERESUMAREAPORT1,
        TABLERESUMVALPORT1: arrayParcel.TABLERESUMVALPORT1,
        NORTH: data.DETIALREPORT1[0].NORTH ? data.DETIALREPORT1[0].NORTH : "",
        N_DISTANT: data.DETIALREPORT1[0].N_DISTANT ? data.DETIALREPORT1[0].N_DISTANT : "",
        SOUTH: data.DETIALREPORT1[0].SOUTH ? data.DETIALREPORT1[0].SOUTH : "",
        S_DISTANT: data.DETIALREPORT1[0].S_DISTANT ? data.DETIALREPORT1[0].S_DISTANT : "",
        EAST: data.DETIALREPORT1[0].EAST ? data.DETIALREPORT1[0].EAST : "",
        E_DISTANT: data.DETIALREPORT1[0].E_DISTANT ? data.DETIALREPORT1[0].E_DISTANT : "",
        WEST: data.DETIALREPORT1[0].WEST ? data.DETIALREPORT1[0].WEST : "",
        W_DISTANT: data.DETIALREPORT1[0].W_DISTANT ? data.DETIALREPORT1[0].W_DISTANT : "",
        ROAD_SURFACE: data.DETIALREPORT1[0].ROAD_SURFACE != "0" ? data.DETIALREPORT1[0].ROAD_SURFACE : "",
        ROAD_WIDTH: data.DETIALREPORT1[0].ROAD_WIDTH ? data.DETIALREPORT1[0].ROAD_WIDTH : "",
        CITY_REGUL: data.DETIALREPORT1[0].CITY_REGUL ? data.DETIALREPORT1[0].CITY_REGUL : "",
        // data report 2
        CDB: arrayCondoBuild.DATACONDOBUILD,
        SBA: arrayCondoBuild.SUM_BUILD_ALL,
        DBA: data.DATACONDOBUILDAREA,
        sumbuild: arrayCondoBuildArea.costbuild,
        sumarea: arrayCondoBuildArea.costarea,
        sumarea: arrayCondoBuildArea.costarea,
        ARRA: arrayCondoBuildArea.DATACONDOBUILDAREA,
        ARRA2_3: array2_3,
        ARRA2_4: array2_4.Arr,
        sumroom: array2_4.sumRoom,
        // data report 3
        NCDR: arrayNCondoRoom,
        SECUR1: data.SECURITY1,
        SECUR2: data.SECURITY2,
        // data report 4
        NCDL: arrayNCondoLevel,
        // data report 5
        NCDS: data.NCONDOSERVICE,
        // data report 6
        NCDOS: arrayNCondos,
        // data report 7
        DO7: arrayCondos7,
        DO7_1: arrayCondosFull,
        // DO7_2: arrayCondos7_2,
        DO7_3: arrayCondos7_3.LABLE,
        DO7_4: arrayCondos7_3.ARR,
        // data report 71
        DO71: arrayCondos71,
        DO72: arrayCondos72,
        // data report 9
        re9: res9,
        head9: res9_2,
        arr9: res9_3,
        // report 13
        head13: res13,
        arr13: res13_1,
        // report 14
        arr14: res14,
        // report 15
        CONDO_VAL: res15.CONDO_VAL,
        AREA_ALL: res15.AREA_ALL,
        arr15: res15.arr,
    }
    // console.log(model, "model")
    return model
}

module.exports = modelExportCondo

const numberWithCommas = (x) => {
    try {
        var parts = String(x).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    } catch
    {
        return null
    }
}