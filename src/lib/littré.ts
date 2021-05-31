import { fetchHTML } from './fetchHTML';

export const searchLittré = async (word: string): Promise<SearchResult> => {
	const $ = await fetchHTML(`https://www.littre.org/definition/${word}`);

	const wordExists = $('.definition');
	if (!wordExists) {
		return Promise.reject('Not found');
	}

	const catgram = ($('.entete b abbr').attr('title') || '').toString();
	const definition = $('.corps li:first-child').text();

	return { catgram, definition, source: 'Littré' };
};
