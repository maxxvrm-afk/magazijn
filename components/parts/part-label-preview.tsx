"use client";

import { printLabelHtml } from "@/lib/dymo";

export function PartLabelPreview() {
  return (
    <div className="card">
      <h3>Test label</h3>
      <button
        className="button"
        onClick={() =>
          printLabelHtml({
            barcode: "DYMO-10001",
            partName: "Voorbumper grille",
            brand: "Volkswagen",
            model: "Polo 9N3 GTI",
            year: 2008,
            shelf: "A1-03",
          })
        }
      >
        Print testlabel
      </button>
    </div>
  );
}
