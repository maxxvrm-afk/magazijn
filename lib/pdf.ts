import { jsPDF } from "jspdf";
import { Part } from "@/types/part";

export function createCartPdf(parts: Part[], cartCode: string) {
  const pdf = new jsPDF();
  pdf.setFontSize(18);
  pdf.text(`Onderdelenlijst ${cartCode}`, 14, 18);
  pdf.setFontSize(10);
  pdf.text(`Totaal: ${parts.length} onderdelen`, 14, 26);

  let y = 38;
  parts.forEach((part, index) => {
    if (y > 270) {
      pdf.addPage();
      y = 20;
    }

    pdf.text(`${index + 1}. ${part.part_name}`, 14, y);
    pdf.text(`Barcode: ${part.barcode}`, 14, y + 6);
    pdf.text(`Auto: ${part.brand ?? "-"} ${part.model ?? "-"} (${part.year ?? "-"})`, 14, y + 12);
    pdf.text(`Status: ${part.status} | Vak: ${part.shelf ?? "-"}`, 14, y + 18);
    y += 30;
  });

  pdf.save(`onderdelen-${cartCode}.pdf`);
}
