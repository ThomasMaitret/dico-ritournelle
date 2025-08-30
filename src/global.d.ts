/// <reference types="@sveltejs/kit" />

type SearchResult = {
  source: Source;
} | null;

type Source = {
  name: "larousse" | "robert" | "littré" | "CNRTL" | "academie" | null;
  url: string;
};

type WordResponse = {
  source: Source;
};
