import { fetchHTML } from './fetchHTML';

export const searchLarousse = async (word: string): Promise<SearchResult> => {
	const $ = await fetchHTML(`https://www.larousse.fr/dictionnaires/francais/${word}`);

	const wordExists = $('.Definitions');
	if (!wordExists) {
		return Promise.reject('Not found');
	}

	const catgram = $('.CatgramDefinition').text();
	const definition = $('.Definitions .DivisionDefinition:first-child').text();

	return { catgram, definition, source: 'Larousse' };
};
