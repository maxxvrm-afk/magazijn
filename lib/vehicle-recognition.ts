export interface RecognitionResult {
  matched: boolean;
  partName?: string;
  brand?: string;
  model?: string;
  year?: string;
  confidence: number;
  source: string;
}

export function recognizeVehicleHeuristic(rawInput: string): RecognitionResult {
  const lower = rawInput.toLowerCase();

  if (lower.includes("polo")) {
    return {
      matched: true,
      partName: lower.includes("bumper") ? "Voorbumper" : "Onbekend onderdeel",
      brand: "Volkswagen",
      model: "Polo 9N3 GTI",
      year: "2008",
      confidence: 0.82,
      source: "heuristic_match",
    };
  }

  if (lower.includes("golf")) {
    return {
      matched: true,
      partName: lower.includes("koplamp") ? "Koplamp" : "Onbekend onderdeel",
      brand: "Volkswagen",
      model: "Golf 7",
      year: "2016",
      confidence: 0.8,
      source: "heuristic_match",
    };
  }

  return { matched: false, confidence: 0, source: "manual_required" };
}
