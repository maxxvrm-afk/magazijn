export function printLabelHtml(input: {
  barcode: string;
  partName: string;
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  shelf?: string | null;
}) {
  const printWindow = window.open("", "_blank", "width=420,height=600");
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>Label</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .label { border: 1px solid #000; padding: 16px; width: 300px; }
          .barcode { font-size: 26px; letter-spacing: 3px; margin: 16px 0; }
          .row { margin-bottom: 8px; }
        </style>
      </head>
      <body>
        <div class="label">
          <div class="row"><strong>Onderdeel:</strong> ${input.partName}</div>
          <div class="row"><strong>Auto:</strong> ${input.brand ?? "-"} ${input.model ?? "-"}</div>
          <div class="row"><strong>Bouwjaar:</strong> ${input.year ?? "-"}</div>
          <div class="row"><strong>Vak:</strong> ${input.shelf ?? "-"}</div>
          <div class="barcode">*${input.barcode}*</div>
          <div class="row"><strong>Code:</strong> ${input.barcode}</div>
        </div>
        <script>window.onload = () => window.print();</script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
