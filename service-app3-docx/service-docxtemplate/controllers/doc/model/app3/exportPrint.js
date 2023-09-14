const { getNameWithTitle, getObjectiveName, toThaiNumber, thaiDate, addCommas, convertDateFormat, Convert } = require("../../../../modules/dataController")
const { setDataPrint } = require("../../../../modules/setData")

const modelExportPrint = async (req, res, next) => {
    dataReturn = modelData(req.body)
    return dataReturn
}

const modelData = async(data) => {
    // console.log(data, "modelData")
    if (!data) return null
    if (Object.keys(data.length === 0)) {
        if (data.data.length == 0) return null
    }

    let dataArr = await setDataPrint(data.data)

    let model = {
        ARR: dataArr
    }
    console.log(model, "modelData")
    return model
}

module.exports = modelExportPrint
