const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const ImageModule = require("docxtemplater-image-module");
const fs = require("fs");
const path = require("path");


const { Document, Packer, Paragraph, TextRun } = require("docx");

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
// const createBuffer = (data) => {
//     const doc = new Document({
//         sections: [
//             {
//                 properties: {},
//                 children: [
//                     new Paragraph({
//                         children: [
//                             new TextRun("Hello World"),
//                             new TextRun({
//                                 text: "Foo Bar",
//                                 bold: true,
//                             }),
//                             new TextRun({
//                                 text: "\tGithub is the best",
//                                 bold: true,
//                             }),
//                         ],
//                     }),
//                 ],
//             },
//         ],
//     });

//     // Packer.toBuffer(doc).then((buffer) => {
//     //     // fs.writeFileSync("My Document.docx", buffer);
//     //     console.log(buffer);
//     // });
//     // Packer.toBlob(doc).then(async (blob) => {
//     //     console.log(blob);
//     //     blob = await blob
//     // });
//     return doc;
// }
const createBufferIMage = (templetePath) => {
    const content = fs.readFileSync(
        // path.resolve(__dirname, "templates/request/newRegister/newRegister6.docx"),
        path.resolve(__dirname, "../templates/" + templetePath),
        "binary"
    );
    const imageOptions = {
        centered: false,
        getImage(tagValue, tagName) {
            console.log({ tagValue, tagName });
            return fs.readFileSync(tagValue);
        },
        getSize() {
            // it also is possible to return a size in centimeters, like this : return [ "2cm", "3cm" ];
            return [150, 150];
        },
    };

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        modules: [new ImageModule(imageOptions)],
    });
    doc.render({ image: "../templates/testImage/iconfinder_check_4473004.png" });

    const buffer = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });

    // fs.writeFile("test.docx", buffer);
    console.log(buffer);
    return buffer;
}

module.exports = {
    createBuffer,
    createBufferIMage
}