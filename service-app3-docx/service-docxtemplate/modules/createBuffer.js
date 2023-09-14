const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");


const createBuffer = (templetePath, data) => {
    const content = fs.readFileSync(
        // path.resolve(__dirname, "templates/request/newRegister/newRegister6.docx"),
        path.resolve(__dirname, "../templates/" + templetePath),
        "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    doc.render(data);

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });

    return buf;
}

module.exports = createBuffer