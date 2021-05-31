import { fetchHTML } from './fetchHTML';

export const searchRobert = async (word: string): Promise<SearchResult> => {
	const $ = await fetchHTML(`https://dictionnaire.lerobert.com/definition/${word}`);

	const wordExists = $('#definitions');
	if (!wordExists) {
		return Promise.reject('Not found');
	}

	const catgram = $('.d_cat').text();
	const definition = $('.d_ptma').text();

	return { catgram, definition, source: 'Robert' };
};
