const { numberWithCommas, convertTens } = require("./dataControl");

function setNumberOflevel(data) {
    if (data.length > 1) {
        let first = data[0].OFLEVEL;
        let two = data[data.length - 1].OFLEVEL;
        return `อาคาร ${data[0].BUILD_NO} ชั้นที่ ${first} - ${two}`;
    } else {
        return `อาคาร ${data[0].BUILD_NO} ชั้นที่ ${data[0].OFLEVEL}`;
    }
}
function setDataReport2_3(data) {
    let array_oflevelMinMax_PB = [];
    let checkbuildno = []
    for (let i = 0; i < data.length; i++) {
        let sum_ast_untcnt = 0;
        let dataItem = data[i];
        if (!checkbuildno.includes(dataItem.BUILD_NO)) {
            data.filter((el) => {
                if (el.BUILD_NO === dataItem.BUILD_NO) {
                    sum_ast_untcnt = sum_ast_untcnt + el.SUM_AST_UNTCNT;
                }
            });
            let obj = new Object();
            obj.CONDO_B_ID = dataItem.CONDO_B_ID;
            obj.BUILD_NO = dataItem.BUILD_NO;
            obj.OFLEVEL = setNumberOflevel(data.filter((el) => el.BUILD_NO === dataItem.BUILD_NO));
            obj.OFLEVEL_ORDER = dataItem.OFLEVEL_ORDER;
            obj.AST_DESC = `${dataItem.AST_DESC}ส่วนกลาง`;
            obj.SUM = sum_ast_untcnt;
            obj.area = "-";
            array_oflevelMinMax_PB.push(obj)
            checkbuildno.push(dataItem.BUILD_NO)
        }
    }
    return array_oflevelMinMax_PB;
}
function setDataReport2_4(data) {
    let dataObj = new Object()
    let newData = [];
    Array.isArray(data) && data.forEach((el) => {
        let oflevel = el.MIN_OFLEVEL === el.MAX_OFLEVEL ? `อาคาร ${el.BUILD_NO} ชั้นที่ ${el.MIN_OFLEVEL}` : `อาคาร ${el.BUILD_NO} ชั้นที่ ${el.MIN_OFLEVEL} - ${el.MAX_OFLEVEL}`;
        let area = el.MIN_PERSONAL_P_AREA === el.MAX_PERSONAL_P_AREA ? `${el.MIN_PERSONAL_P_AREA}` : `${el.MIN_PERSONAL_P_AREA} - ${el.MAX_PERSONAL_P_AREA}`;
        el.NAME = el.ROOM_TYPE_NAME ? el.ROOM_TYPE_NAME : ""
        el.room = el.COUNT_NUM_ROOM
        el.OFLEVEL = oflevel
        el.AREA = area
        newData.push(el);
    })
    dataObj.Arr = newData;
    dataObj.sumRoom = data.reduce((x, e) => x + e.COUNT_NUM_ROOM, 0);
    // console.log(dataObj);
    return dataObj;
}
function setDataReport8(data) {

}
function setDataReport9(data) {
    let newData = [];
    let floors = "";
    let buildno = "";
    let sunbuild = 0;
    Array.isArray(data) && data.forEach((el, index) => {
        if (index === 0) {
            floors = el.MAX_FLOOR;
            buildno = el.BUILD_NO;
            sunbuild = sunbuild + el.SUM_BUILD;
        } else {
            floors += ` - ${el.MAX_FLOOR}`;
            buildno += `,${el.BUILD_NO}`;
            sunbuild = sunbuild + el.SUM_BUILD;
        }
    });
    let obj = new Object();
    obj.FLOORS = floors;
    obj.BUILD_NOS = buildno;
    obj.BUILD_SUM = sunbuild;
    newData.push(obj);
    // console.log(newData,data);
    return newData;
}
function setDataReport9_1(data) {
}
function setHeaderReport9_1(data) {
    let newHeader = "";
    Array.isArray(data) && data.forEach((el, index) => {
        if (index == 0) {
            newHeader = el.PERSONAL_P_NAME;
        } else {
            newHeader += `/${el.PERSONAL_P_NAME}`;
        }
    })
    // console.log(newHeader);
    return newHeader;
}

function setDataReport9_2(data) {
    let newData = [];
    Array.isArray(data) && data.forEach((el, index) => {
        el.VAL = numberWithCommas(el.VAL_AMT_P_MET) != '0' ? numberWithCommas(el.VAL_AMT_P_MET) : "-";
        newData.push(el)
    })
    // console.log(newData);
    return newData;
}
function setHeaderReport13(data) {
    let newHeader = "";
    Array.isArray(data) && data.forEach((el, index) => {
        if (el.MAXLEVEL > 30) {
            newHeader = "ตารางที่ 5 อาคาร 31-69 ชั้น มีลิฟต์";
        } else if (el.MAXLEVEL <= 30 && el.MAXLEVEL > 15) {
            newHeader = "ตารางที่ 4 อาคาร 16-30 ชั้น มีลิฟต์";
        } else if (el.MAXLEVEL <= 15 && el.MAXLEVEL > 8) {
            newHeader = "ตารางที่ 3 อาคาร 9-15 ชั้น มีลิฟต์";
        } else if (el.MAXLEVEL <= 8 && el.MAXLEVEL > 5) {
            newHeader = "ตารางที่ 2 อาคาร 5-8 ชั้น มีลิฟต์";
        } else if (el.MAXLEVEL <= 5 && el.COUNT_LIFT > 0) {
            newHeader = "ตารางที่ 2 อาคาร 5-8 ชั้น มีลิฟต์";
        } else if (el.MAXLEVEL <= 5 && el.COUNT_LIFT == 0) {
            newHeader = "ตารางที่ 1 อาคาร 1-5 ชั้น มีลิฟต์";
        }
    })
    // console.log(newHeader);
    return newHeader;
}
function setDataReport13_1(data) {
    let newData = [];
    Array.isArray(data) && data.forEach((el, index) => {
        el.VAL = numberWithCommas(el.VAL_AMT_P_MET) != '0' ? numberWithCommas(el.VAL_AMT_P_MET) : "-";
        el.VAL_AMT = numberWithCommas(el.VAL_AMT_P_MET) != '0' ? numberWithCommas(convertTens(el.VAL_AMT_P_MET)) : "-";
        el.INDEX_ = el.INDEX_ADJ != '0' ? el.INDEX_ADJ : "-";
        newData.push(el);
    })
    // console.log(newData);
    return newData;
}
function setDataReport14(data) {
    let newData = [];
    let before_VAL = 0;
    Array.isArray(data) && data.forEach((el, index) => {
        el.VAL = numberWithCommas(el.VAL_AMT_P_MET) != '0' ? numberWithCommas(el.VAL_AMT_P_MET) : "-";
        el.VAL_AMT = numberWithCommas(el.VAL_AMT_P_MET) != '0' ? numberWithCommas(convertTens(el.VAL_AMT_P_MET)) : "-";
        el.INDEX_ = el.INDEX_ADJ != '0' ? el.INDEX_ADJ : "-";
        if (el.USE_CATG.indexOf("พื้นที่ทรัพย์ส่วนกลาง") || el.USE_CATG.indexOf("ที่จอดรถยนต์ส่วนบุคคล")) {
            let BEFORE_VAL = "-";
            el.BEFORE_VAL = BEFORE_VAL
        } else {
            let BEFORE_VAL = ((Number(el.VAL_AMT_P_MET) - before_VAL) - Number(el.VAL_AMT_P_MET)) === 0 ? "-" : numberWithCommas(Math.abs(el.VAL_AMT_P_MET - before_VAL));
            el.BEFORE_VAL = BEFORE_VAL
        }
        newData.push(el);
        before_VAL = el.VAL_AMT_P_MET;
    })
    // console.log(newData);
    return newData;
}
function setDataReport15(data) {
    let newData = [];
    let sum_val_price = 0;
    let sum_area_room = 0;
    Array.isArray(data) && data.forEach((el, index) => {
        if (el.USE_CATG.indexOf("พื้นที่ทรัพย์ส่วนกลาง") || el.USE_CATG.indexOf("ที่จอดรถยนต์ส่วนบุคคล")) {
            el.BUILD_NAME == "-" ? "" : el.BUILD_NAME;
        } else {
            el.COUNT_COND_H_ID = numberWithCommas(el.COUNT_COND_H_ID);
            el.SUM_PERSONAL_P_AREA = numberWithCommas(el.SUM_PERSONAL_P_AREA.toFixed(2));
            el.VAL = numberWithCommas(Math.round(el.VAL_AMT_P_MET));
            el.VAL_AMT = numberWithCommas(Math.round(Number(el.VAL_AMT_P_MET) * Number(el.SUM_PERSONAL_P_AREA)));
        }
        if(el.FlOOR_TYPE_ID == 1 || el.FlOOR_TYPE_ID == 2 || el.USE_CATG.indexOf("พื้นที่ทรัพย์ส่วนกลาง") || el.USE_CATG.indexOf("ที่จอดรถยนต์ส่วนบุคคล")){
            sum_area_room += el.SUM_PERSONAL_P_AREA;
            sum_val_price += Math.round(el.VAL_AMT_P_MET, -2) * el.SUM_PERSONAL_P_AREA;
        }else{
            sum_area_room += el.SUM_PERSONAL_P_AREA;
            sum_val_price += Math.round(el.VAL_AMT_P_MET, -2) * el.SUM_PERSONAL_P_AREA;
        }
        newData.push(el);
    })
    console.log(newData, sum_area_room, sum_val_price);
    return newData;
}
module.exports = {
    setDataReport2_3,
    setDataReport2_4,
    setDataReport8,
    setDataReport9,
    setDataReport9_1,
    setHeaderReport9_1,
    setDataReport9_2,
    setHeaderReport13,
    setDataReport13_1,
    setDataReport14,
    setDataReport15
}