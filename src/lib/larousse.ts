import { fetchHTML } from './fetchHTML';

export const searchLarousse = async (word: string): Promise<SearchResult> => {
	const url = `https://www.larousse.fr/dictionnaires/francais/${word}`;
	const $ = await fetchHTML(url);

	if (!$) {
		return null;
	}

	const wordExists = $('.Definitions');
	if (!wordExists) {
		return null;
	}

	const catgramDef = $('.CatgramDefinition');
	catgramDef.find('a').remove();
	const catgram = catgramDef.text();
	const definition = $('.Definitions .DivisionDefinition:first-child').html();

	return {
		catgram,
		definition,
		source: { name: 'larousse', url }
	};
};
