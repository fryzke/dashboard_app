import { Company } from "./types";

export const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [{ "yearMonth": "2024-01","source":"",  "emissions": 120}, { "yearMonth": "2024-02","source":"", "emissions": 110}, {"yearMonth": "2024-03","source":"", "emissions": 95 }]
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [{ "yearMonth": "2024-01","source":"",  "emissions": 80}, { "yearMonth": "2024-02","source":"", "emissions": 105}, {"yearMonth": "2024-03", "source":"","emissions": 120 }]
  }
];

