/// <reference types="@sveltejs/kit" />

type SearchResult = {
	catgram: string | null;
	definition: string | null;
	source: Source;
} | null;

type Source = { name: 'larousse' | 'robert' | 'littré' | 'CNRTL' | null; url: string };

type WordResponse = {
	catgram: string | null;
	definition: string | null;
	sources: Source[];
};
