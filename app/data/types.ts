export type GhgEmission = {
  yearMonth: string;  // "2025-01"
  source: string;     // gasoline, diesel, etc
  emissions: number;  // tons CO2e
};

export type Company = {
  id: string;
  name: string;
  country: string; // Country.code
  emissions: GhgEmission[];
};

export type Post = {
  id: string;
  title: string;
  resourceUid: string; // Company.id
  dateTime: string;    // e.g., "2024-02"
  content: string;
};

export type Country = {
  code: string;
  name: string;
};


