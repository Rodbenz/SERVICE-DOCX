const controller = require("../../controllers/doc/condo");
const auth = require("../auth");


function reportcondo(req, res, next) {

    let authen = auth(req, res, next)
    if (!authen) {
        res.status(401).send("Unauthorized")
        return null
    }
    // console.log('middleWareCustomerRenew');
    let reqBody = req.body
    console.log(reqBody, "reqBody")
    if (!reqBody) {
        res.status(400).send("Body is Empty")
        return null
    }
    controller.exportCondo(req, res, next)
}


module.exports = reportcondo