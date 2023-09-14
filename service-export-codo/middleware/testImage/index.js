const exportDocxImage = require("../../controllers/doc/testImage");
const auth = require("../auth");


function testDocxImage(req, res, next) {
    console.log('5555555555555');
    // let authen = auth(req, res, next)
    // if (!authen) {
    //     res.status(401).send("Unauthorized")
    //     return null
    // }
    // console.log('middleWareCustomerRenew');
    // let reqBody = req.body
    // console.log(reqBody, "reqBody")
    // if (!reqBody) {
    //     res.status(400).send("Body is Empty")
    //     return null
    // }
    exportDocxImage(req, res, next)
}


module.exports = testDocxImage