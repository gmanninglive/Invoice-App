import React from "react";
import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";

export const GeneratePdf = async (html) => {
  try {
    const image = await toPng(html.current, { quality: 1 });
    const doc = new jsPDF();
    doc.addImage(image, "PNG", 0, 0, 210, 297);
    doc.save();
  } catch (e) {
    console.log(e);
  }
};
