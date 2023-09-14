const createBuffer = require("../../../modules/createBuffer");
const modelExportPrint = require("../model/app3/exportPrint");

const fs = require('fs');
const mammoth = require('mammoth');
const PDFDocument = require('pdfkit');

async function convertDocxBufferToPdfBuffer(docxBuffer, callback) {
    mammoth.convertToHtml({ buffer: docxBuffer })
        .then(async (result) => {
            const html = result.value;

            // Create a PDF document
            const pdfDoc = new PDFDocument();
            const pdfBuffers = [];

            pdfDoc.on('data', (chunk) => {
                pdfBuffers.push(chunk);
            });

            pdfDoc.on('end', async () => {
                const pdfBuffer = Buffer.concat(pdfBuffers);
                // Save the PDF to a file
                callback(pdfBuffer);
                // console.log('Conversion completed. PDF saved as "output.pdf"');
            })

            // Pipe the HTML content into the PDF document
            pdfDoc.pipe(fs.createWriteStream('output.pdf')); // Optional, if you want to save the PDF to a file

            pdfDoc.text(html);

            // End the PDF stream
            pdfDoc.end();
        })
        .catch((error) => {
            console.error('Error converting DOCX to PDF:', error);
        });
}


const exportDocxPrint = async (req, res, next) => {
    let momdel = await modelExportPrint(req);

    let dataBuffer = await createBuffer("app3/DocPrint.docx", momdel); // replace name
    // await convertDocxBufferToPdfBuffer(dataBuffer)


    res.setHeader('Content-disposition', 'attachment; filename=test.docx');
    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send(new Buffer(dataBuffer, 'binary'));
    res.end();
}

module.exports = exportDocxPrint