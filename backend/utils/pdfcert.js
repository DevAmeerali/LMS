const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = (studentName, courseName, outputPath) => {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(outputPath));

  doc
    .fontSize(26)
    .text("Certificate of Completion", { align: "center" })
    .moveDown();

  doc
    .fontSize(18)
    .text(`This certifies that`, { align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(22)
    .text(studentName, { align: "center", underline: true })
    .moveDown(0.5);

  doc
    .fontSize(18)
    .text(`has successfully completed the course`, { align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(22)
    .text(courseName, { align: "center", underline: true })
    .moveDown(2);

  doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, {
    align: "right",
  });

  doc.end();
};

module.exports = generateCertificate;
