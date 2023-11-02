const { conVertNumberMode, numberWithCommas, findMedian, convertTens } = require("./dataControl");

function setDataParcelReport1(data) {
    let obj = new Object();
    let newData = [];
    let sum_val = 0;
    let sum_area = 0;
    for (i = 0; i < data.length; i++) {
        let dataItems = data[i];
        let NRAI = dataItems.NRAI ? dataItems.NRAI : "0";
        let NNHAN = dataItems.NNHAN ? dataItems.NNHAN : "0";
        let NWAH = dataItems.NWAH ? numberWithCommas((dataItems.NWAH) + (dataItems.DREMAIN)) : "0";
        let VAL_PER_WAH = dataItems.VAL_PER_WAH != "" ? numberWithCommas(dataItems.VAL_PER_WAH) : "ไม่มีข้อมูลซื้อขาย";
        let VAL_PER_WAH_SUM = dataItems.VAL_PER_WAH != "" ? numberWithCommas(Math.round(Number(dataItems.VAL_PER_WAH) * ((Number(dataItems.NRAI) * 400) + (Number(dataItems.NNHAN) * 100) + Number(dataItems.NWAH) + dataItems.DREMAIN))) : "-";
        sum_val += (Number(dataItems.VAL_PER_WAH) * ((Number(dataItems.NRAI) * 400) + (Number(dataItems.NNHAN) * 100) + Number(dataItems.NWAH) + dataItems.DREMAIN));
        sum_area += ((Number(dataItems.NRAI) * 400) + (Number(dataItems.NNHAN) * 100) + Number(dataItems.NWAH) + dataItems.DREMAIN);
        dataItems.AREA = `${NRAI}-${NNHAN}-${NWAH}`;
        dataItems.VAL_PER_WAH = VAL_PER_WAH;
        dataItems.VAL_PER_WAH_SUM = (VAL_PER_WAH_SUM);
        dataItems.UTM_ALL = `${dataItems.UTM_CODE}-${dataItems.UTM_P}-${dataItems.UTM_NO}-${dataItems.UTM_PAGE}`
        newData.push(dataItems)
    }
    let rai = 0;
    let nhan = 0;
    let tarangwah = 0;
    rai = ((Number(sum_area) * 4) / 1600);
    let mmo1 = Math.round((sum_area * 4), 1600); //เศษของ ไร่
    nhan = (Number(mmo1) / 400);
    let mmo2 = Math.round(mmo1, 400); //เศษของ งาน
    tarangwah = mmo2 / 4

    obj.TABLEREPORT1 = newData;
    obj.TABLERESUMAREAPORT1 = `${Math.round(rai)}-${Math.round(nhan)}-${numberWithCommas(tarangwah)}`;
    obj.TABLERESUMVALPORT1 = numberWithCommas(Math.round(sum_val));
    return obj;
}

function setDataCondoBUildReport2(data) {
    let obj = new Object();
    let newData = []
    let sum_build = 0;
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let BUILDING_NAME = dataItem.BUILDING_TYPE_NAME == 'พาณิชยกรรม' ? 'อาคารชุดพาณิชย์สูง :' : `อาคารชุด${dataItem.BUILDING_TYPE_NAME}สูง :`;
        let MAX_FLOOR = "";
        if (dataItem.NUM_TOWER > 0) {
            if (dataItem.PRONOUN_BUILD == "" || dataItem.PRONOUN_BUILD == null || dataItem.PRONOUN_BUILD == "ทาวเวอร์") {
                MAX_FLOOR = dataItem.MAX_FLOOR + " ชั้น (" + dataItem.NUM_TOWER + " ทาวเวอร์)";
            } else {
                MAX_FLOOR = dataItem.MAX_FLOOR + " ชั้น (อาคาร " + dataItem.BUILD_NO_TOWER + ")";
            }
        } else {
            MAX_FLOOR = dataItem.MAX_FLOOR + " ชั้น";
        }
        sum_build = (sum_build + (dataItem.SUM_BUILD))
        dataItem.NAME = BUILDING_NAME;
        dataItem.MAX_FLOOR = MAX_FLOOR;
        newData.push(dataItem);
    }
    obj.DATACONDOBUILD = newData;
    obj.SUM_BUILD_ALL = sum_build;
    return obj;
}

function setDataCondoBUildAreaReport2(data) {
    let obj = new Object();
    let newData = [];
    let costbuild = 0;
    let costarea = 0;
    let str = data.length > 1 ? 'อาคาร' : 'ห้องชุด';
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        dataItem.TYPE_NAME = dataItem.BUILDING_TYPE_NAME;
        dataItem.NAME = `${str}${dataItem.BUILDING_TYPE_NAME}`;
        dataItem.RAR = dataItem.ROOM_AREA ? numberWithCommas(dataItem.ROOM_AREA.toFixed(2)) : "0.00";
        dataItem.BAR = dataItem.BUILD_AREA ? numberWithCommas(dataItem.BUILD_AREA.toFixed(2)) : "0.00";
        dataItem.RARN = dataItem.ROOM_AREA_NOTCAR ? numberWithCommas(dataItem.ROOM_AREA_NOTCAR.toFixed(2)): "0.00";
        costbuild = costbuild + Number(dataItem.BUILD_AREA);
        costbuild = costbuild + Number(dataItem.BUILD_AREA);
        costarea = costarea + Number(dataItem.ROOM_AREA);
        newData.push(dataItem);
    }
    obj.costbuild = numberWithCommas(costbuild.toFixed(2));
    obj.costarea = numberWithCommas(costarea.toFixed(2));
    obj.DATACONDOBUILDAREA = newData;
    return obj;
}

function setDataNCondoRooom(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        dataItem.FLOORS = dataItem.FLOORS_SIZE != "" ? `ปู${dataItem.FLOORS} ขนาด ${dataItem.FLOORS_SIZE}` : dataItem.FLOORS;
        dataItem.BALCONY = dataItem.BALCONY_SIZE != "" ? `ปู${dataItem.BALCONY} ขนาด ${dataItem.BALCONY_SIZE}` : dataItem.BALCONY;
        dataItem.BATH_FL = dataItem.BATH_FL_SIZE != "" ? `ปู${dataItem.BATH_FL} ขนาด ${dataItem.BATH_FL_SIZE}` : dataItem.BATH_FL;
        dataItem.BATH_WALL = dataItem.BATH_WALL_SIZE != "" ? `ปู${dataItem.BATH_WALL} ขนาด ${dataItem.BATH_WALL_SIZE}` : dataItem.BATH_WALL;
        dataItem.WARE1 = dataItem.WARE1 == 'Y' ? String.fromCharCode(9745) : String.fromCharCode(9744);
        dataItem.WARE2 = dataItem.WARE2 == 'Y' ? String.fromCharCode(9745) : String.fromCharCode(9744);
        dataItem.WARE3 = dataItem.WARE3 == 'Y' ? String.fromCharCode(9745) : String.fromCharCode(9744);
        dataItem.WARE4 = dataItem.WARE4 == 'Y' ? String.fromCharCode(9745) : String.fromCharCode(9744);
        dataItem.WARE5 = dataItem.WARE5 == 'Y' ? String.fromCharCode(9745) : String.fromCharCode(9744);
        dataItem.WARE6 = dataItem.WARE6 == 'Y' ? String.fromCharCode(9745) : String.fromCharCode(9744);
        dataItem.BROOM1 = dataItem.BATHROOM_VENTILATE == '1' ? String.fromCharCode(0x25C9) : String.fromCharCode(0x25CE);//0x25C9
        dataItem.BROOM2 = dataItem.BATHROOM_VENTILATE == '2' ? String.fromCharCode(0x25C9) : String.fromCharCode(0x25CE);
        dataItem.BATHROOM_AREA = dataItem.BATHROOM_AREA.toFixed(2);
        newData.push(dataItem)
    }
    return newData;
}

function setDataNCondoLevel(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let AST = "";
        dataItem.BUILD_NO = dataItem.BUILD_NO ? dataItem.BUILD_NO : "";
        dataItem.OFLEVEL = dataItem.OFLEVEL ? dataItem.OFLEVEL : "";
        dataItem.AST_DESC = dataItem.AST_DESC ? dataItem.AST_DESC : "";
        if (dataItem.AST_UNTCNT == null || dataItem.AST_UNTCNT == "") {
            AST = `จำนวน ${dataItem.NUM_} ${dataItem.NAMETH}`;
        } else {
            AST = `จำนวน ${dataItem.NUM_}  ${dataItem.NAMETH} ความจุ ${dataItem.AST_UNTCNT ? dataItem.AST_UNTCNT : ""} ${dataItem.NAMETH_CONTAIN ? dataItem.NAMETH_CONTAIN : ""}`;
        }
        dataItem.AST = AST;
        newData.push(dataItem);
    }
    return newData;
}

function setNCondos(data) {
    // console.log(data);
    let newData = []
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];

        if (dataItem.MINUNIT_NO === dataItem.MAXUNIT_NO) {
            dataItem.MNO = `${dataItem.MINUNIT_NO}`
        } else {
            dataItem.MNO = `${dataItem.MINUNIT_NO} - ${dataItem.MAXUNIT_NO}`
        }
        dataItem.PERSONAL_AREA = dataItem.MINPERSONAL_P_AREA === dataItem.MAXPERSONAL_P_AREA ? `${dataItem.MINPERSONAL_P_AREA.toFixed(2)}` : `${dataItem.MINPERSONAL_P_AREA.toFixed(2)} - ${dataItem.MAXPERSONAL_P_AREA.toFixed(2)}`
        dataItem.PERSONAL_P_NAME = dataItem.PERSONAL_P_NAME
        dataItem.PERSONAL_P = dataItem.PERSONAL_P_NAME1
        dataItem.PERSONAL_AREA_P = dataItem.MINPERSONAL_P_AREA1 ? dataItem.MINPERSONAL_P_AREA1 === dataItem.MAXPERSONAL_P_AREA1 ? `${dataItem.MINPERSONAL_P_AREA1.toFixed(2)}` : `${dataItem.MINPERSONAL_P_AREA1.toFixed(2)} - ${dataItem.MAXPERSONAL_P_AREA1.toFixed(2)}` : ""
        newData.push(dataItem);
    }
    return newData;
}

async function setDataNCondos(data) {
    let newData = await setNCondos(data)
    // console.log(newData);
    let checkus = [];
    let buildno = []
    let DataArr = []
    for (let i = 0; i < newData.length; i++) {
        let dataItem = newData[i];
        buildno = String(dataItem.USE_CATG);
        if (buildno !== checkus) {
            let setObj = {
                BUILD_NO: dataItem.BUILD_NO,
                NAME: dataItem.USE_CATG,
                ARR: newData.filter((el) => el.BUILD_NO == dataItem.BUILD_NO && el.USE_CATG == dataItem.USE_CATG)
            }
            DataArr.push(setObj);
            checkus = buildno;
        }
    }
    return DataArr;
}

function setDataCondos7(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        dataItem.OF = dataItem.OFLEVEL
        dataItem.MIN_AR = `${numberWithCommas(dataItem.MIN_S_D_FUR_AR)} - ${numberWithCommas(dataItem.MAX_S_D_FUR_AR)}`;
        dataItem.S_D_FUR_AR = dataItem.DATE_PRICE ? `${numberWithCommas(dataItem.S_D_FUR_AR)}` : "-";
        dataItem.DATE_PRICE = dataItem.DATE_PRICE ? `ปี ${dataItem.DATE_PRICE}` : "-";
        dataItem.NAME = dataItem.ROOM_TYPE_NAME
        newData.push(dataItem);
    }
    return newData;
}
function setDataCondos7_1(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        dataItem.DETAIL = `- สัญญาจะซื้อจะขายห้องชุดพักอาศัย ปี ${dataItem.DATE_PRICE}  ตารางเมตรละ ${dataItem.MIN_S_D_FUR_AR == dataItem.MIN_S_D_FUR_AR ? numberWithCommas(dataItem.MIN_S_D_FUR_AR) : `${numberWithCommas(dataItem.MIN_S_D_FUR_AR)} - ${numberWithCommas(dataItem.MAX_S_D_FUR_AR)}  บาท  เฉลี่ยตารางเมตรล่ะ ${numberWithCommas(dataItem.SUM_S_D_FUR_AR / dataItem.COUNT_S_D_FUR_AR)} บาท`}`
        newData.push(dataItem);
    }
    return newData;
}
function setDataCondos7_2(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        dataItem.DETAIL = `- สัญญาจะซื้อจะขายห้องชุดพักอาศัย ปี ${dataItem.MIN_DATE_PRICE} - ${dataItem.MAX_DATE_PRICE} ตารางเมตรละ  ${dataItem.MIN_S_D_FUR_AR == dataItem.MAX_S_D_FUR_AR ? numberWithCommas(dataItem.MIN_S_D_FUR_AR) : `${numberWithCommas(dataItem.MIN_S_D_FUR_AR)} - ${numberWithCommas(dataItem.MAX_S_D_FUR_AR)} บาท  เฉลี่ยตารางเมตรล่ะ ${numberWithCommas(dataItem.SUM_COUNT)} บาท  ได้ราคาตารางเมตรละ  ${numberWithCommas(dataItem.SUM_COUNT_PATSAT)} บาท`}`;
        newData.push(dataItem);
    }
    return newData;
}
function setDataCondoFull(data){
    // console.log(data);
    let newData = [];
    let buildno = [];
    for(let i = 0; i < data.length; i++){
        let dataItem = data[i];
        if(!buildno.includes(dataItem.BUILD_NO)){
            let setData = {
                BUILD_NO: `อาคาร${dataItem.BUILD_NO}`,
                ARR : data.filter((el)=> el.BUILD_NO === dataItem.BUILD_NO)
            }
            newData.push(setData);
            buildno.push(dataItem.BUILD_NO);
        }
    }
    // console.log(newData);
    return newData;
}
function setDataCondos7_3(data) {
    let obj = new Object();
    let newData = [];
    let cost = 0;
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        cost = cost + dataItem.COT_ROM;
        dataItem.DETAIL = ` - ปี ${dataItem.DATE_PRICE} ขายได้ ${numberWithCommas(dataItem.COT_ROM)} %`;
        newData.push(dataItem);
    }
    obj.LABLE = `ขายได้ ${cost} %`;
    obj.ARR = newData;
    return obj;
}
function arrayMode(array, justMode = 0, medianArr) {
    // console.log(array);
    let median = findMedian(medianArr);
    const count = {};
    let mostCommon = '';
    let iter = 0;

    array.forEach((item) => {
        if (count[item]) {
            count[item]++;
        } else {
            count[item] = 1;
        }
    });
    for (const key in count) {
        if (count[key] > iter) {
            mostCommon = key;
            iter = count[key];
        }
    }

    if (justMode === 0) {
        return mostCommon;
    } else {
        return [{ mode: numberWithCommas(mostCommon), count: iter , median: numberWithCommas(median)}];
        console.log({ mode: mostCommon, count: iter , median: median});
    }
}

function setData71(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        dataItem.YEAR_PRICE = dataItem.YEAR_PRICE ? dataItem.YEAR_PRICE : dataItem.YEAR_PRICE;
        dataItem.PRICE_EDIT = numberWithCommas(dataItem.PRICE_S_EDIT);
        dataItem.PRICE_EDIT_P = numberWithCommas(dataItem.PRICE_S_EDIT_PERM);
        dataItem.BUILD_NO = dataItem.BUILD_NO == "-" ? "" : dataItem.BUILD_NO;
        dataItem.MODE = (Number(dataItem.PRICE_S_EDIT_PERM) / 1000) * 1000;
        newData.push(dataItem)
    }
    return newData
}
function setCount71(data) {
    let newData = [];
    if (Array.isArray(data) && data) {
        for (let i = 0; i < data.length; i++) {
            let dataItem = data[i];
            dataItem.AVGS = numberWithCommas(dataItem.AVG);
            dataItem.meantens = numberWithCommas(convertTens(dataItem.AVG))
            newData.push(dataItem);
        }
    }
    return newData;
}
function setCountMean(data) {
    let newData = [];
    if (Array.isArray(data) && data) {
        for (let i = 0; i < data.length; i++) {
            let dataItem = data[i];
            dataItem.cou = numberWithCommas(dataItem.cou);
            newData.push(dataItem);
        }
    }
    return newData;
}

async function setDataCondos71(data, condoName, countData, countCondoAll, countMaen) {
    let res = await setData71(data)
    let newData = [];
    let buildno = "";
    let cost = 0;
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        cost = cost + 1;
        if (dataItem.BUILD_NO != buildno) {
            let array = [];
            let medianArr = [];
            res.filter((el) => {
                if(el.CONDO_B_ID === dataItem.CONDO_B_ID){
                    array.push(conVertNumberMode(el.MODE))
                    medianArr.push(el.MODE);
                }
            })
            let datamean = countMaen.filter((el) => el.CONDO_B_ID === dataItem.CONDO_B_ID)
            let setData = {
                BUILD_NO: dataItem.BUILD_NO,
                NAME: condoName,
                ARR: res.filter((el) => el.BUILD_NO == dataItem.BUILD_NO),
                SUM_AVG: await setCount71(countData.filter((el) => el.CONDO_B_ID === dataItem.CONDO_B_ID)),
                COUNTALL: countCondoAll.filter((el) => el.CONDO_B_ID === dataItem.CONDO_B_ID),
                mean: await setCountMean(datamean),
                mode: await arrayMode(array, 1, medianArr),
            }
            buildno = dataItem.BUILD_NO
            // console.log(setData);
            newData.push(setData);
        }
    }
    // console.log(array);
    return newData;
}
async function setDataCondos72(data, condoName, countData, countCondoAll, countMaen) {
    let res = await setData71(data)
    let newData = [];
    let buildno = "";
    let cost = 0;
    let strArr = [];
    let array = [];
    let medianArr = []
    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        if (dataItem.BUILD_NO != buildno) {
            strArr.push(dataItem.BUILD_NO)
            buildno = dataItem.BUILD_NO
        }
        array.push(conVertNumberMode(dataItem.MODE));
        medianArr.push(dataItem.MODE);
    }

    let dataSet = {
        BUILD_NO : strArr.join(', '),
        NAME: condoName,
        ARR : res,
        SUM_AVG: numberWithCommas(countData.reduce((accumulator, currentValue) => accumulator + currentValue.AVG, 0)),
        COUNTALL: countCondoAll.reduce((accumulator, currentValue) => accumulator + currentValue.CCCC, 0),
        mean: numberWithCommas(countMaen.reduce((accumulator, currentValue) => accumulator + Number(currentValue.cou), 0)),
        mode: await arrayMode(array, 1, medianArr),
        meantens : numberWithCommas(convertTens(countData.reduce((accumulator, currentValue) => accumulator + currentValue.AVG, 0)))
    }
    newData.push(dataSet)
    // console.log(dataSet);
    return newData;
}

module.exports = {
    setDataParcelReport1,
    setDataCondoBUildReport2,
    setDataCondoBUildAreaReport2,
    setDataNCondoRooom,
    setDataNCondoLevel,
    setDataNCondos,
    setDataCondos7,
    setDataCondos7_1,
    setDataCondos7_2,
    setDataCondoFull,
    setDataCondos7_3,
    setDataCondos71,
    setDataCondos72
}


