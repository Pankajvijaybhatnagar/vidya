// Fee Structure 2027-28, transcribed from the Vidyapeeth's fee notice (amounts in ₹).
export const FEE_SESSION = "2027–28";

export const FEE_NOTE = "Transportation charges are not included in the school fees and will be payable separately.";

const row = (cls, annual, monthly) => ({ cls, registration: 500, annual, monthly, yearly: 500 + annual + monthly * 12 });

export const FEES = [
  row("Nursery", 4800, 1200),
  row("L.K.G.", 4800, 1200),
  row("U.K.G.", 4800, 1200),
  row("1st", 4800, 1200),
  row("2nd", 4800, 1200),
  row("3rd", 4800, 1200),
  row("4th", 4800, 1200),
  row("5th", 5600, 1400),
  row("6th", 5600, 1400),
  row("7th", 5600, 1400),
  row("8th", 5600, 1400),
  row("9th", 6400, 1600),
  row("10th", 6400, 1600),
  row("11th", 6400, 1600),
  row("12th", 6400, 1600),
];

// Classes share the same fee within each band.
export const FEE_BANDS = [
  { label: "Nursery – 4th", hint: "Balvatika & primary", from: "Nursery", to: "4th" },
  { label: "5th – 8th", hint: "Middle school", from: "5th", to: "8th" },
  { label: "9th – 12th", hint: "Secondary & senior secondary", from: "9th", to: "12th" },
].map((b) => ({ ...b, fee: FEES.find((f) => f.cls === b.from) }));

export const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
