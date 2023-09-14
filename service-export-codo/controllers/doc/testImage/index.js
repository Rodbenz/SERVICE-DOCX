const createBuffer = require("../../../modules/createBuffer");
// const model = require("../model/condo");



const exportDocxImage = async (req, res, next) => {
    // console.log(req.body, "reqdata");
    // let modelx = await model.exportCondo(req, res, next)
    // if (!modelx) {
    //     res.status(400).send("BAD REQUEST")
    //     return null;
    // } else {
        let dataBuffer = await createBuffer.createBufferIMage("testImage/testImage.docx"); // replace name
        res.setHeader('Content-disposition', 'attachment; filename=test.docx');
        res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

        res.setHeader('Access-Control-Allow-Origin', '*');

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        res.setHeader('Access-Control-Allow-Credentials', true);
        res.send(new Buffer(dataBuffer, 'binary'));
        res.end();
    // }
}

module.exports = exportDocxImage