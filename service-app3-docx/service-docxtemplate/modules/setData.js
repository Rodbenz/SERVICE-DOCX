const { addCommas, dateFormatTime } = require("./dataController");

async function setDataPrint(data) {
    let res = await dataPrint(data);
    let newData = [];
    Array.isArray(data) && data.forEach((el, index) => {
        let dataset = {
            pages: `${data.length}`,
            PARCEL_S3_SEQ: el.PARCEL_S3_SEQ,
            arr: res.filter((e) => e.PARCEL_S3_SEQ === el.PARCEL_S3_SEQ)
        }
        newData.push(dataset);
        console.log(dataset);
    });
    return newData;
}
const dataPrint = (data) => {
    let newData = [];
    Array.isArray(data) && data.forEach((el, index) => {
        el.VAL = addCommas(el.VAL_PER_WAH);
        el.VAL_ = addCommas(el.STREET_VALUE_);
        el.VAL_AREA = addCommas(el.VALAREA);
        el.CHANGWAT_NAME = el.CHANGWAT_NAME ? el.CHANGWAT_NAME : "";
        el.DATE = dateFormatTime(el.DATE_CREATED);
        el.RNGW = `${el.NRAI}-${el.NNHAN}-${parseFloat(el.NWAH).toFixed(1)}`
        el.VAL_PER = el.VAL_PER_WAH === null ? 0 : el.VAL_PER_WAH.toLocaleString('en-US')
        el.VALAREA_ALL = el.VALAREA === null ? 0 : el.VALAREA.toLocaleString('en-US')
        newData.push(el);
    });
    return newData;
}

module.exports = {
    setDataPrint
}