import { fetchHTML } from './fetchHTML';

export const searchLarousse = async (word: string): Promise<SearchResult> => {
	const $ = await fetchHTML(`https://www.larousse.fr/dictionnaires/francais/${word}`);

	const wordExists = $('.Definitions');
	if (!wordExists) {
		return Promise.reject('Not found');
	}

	const catgramDef = $('.CatgramDefinition');
	catgramDef.find('a').remove();
	const catgram = catgramDef.text();
	const definition = $('.Definitions .DivisionDefinition:first-child').html();

	return { catgram, definition, source: 'Larousse' };
};
