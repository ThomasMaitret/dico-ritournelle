import { fetchHTML } from './fetchHTML';

export const searchCnrtl = async (word: string): Promise<SearchResult> => {
	const url = `https://www.cnrtl.fr/definition/${word}`;
	const $ = await fetchHTML(url);

	if (!$) {
		return null;
	}

	const wordExists = $('#lexicontent');
	if (!wordExists) {
		return null;
	}

	const catgramDef = $('#vitemselected:first-child a');
	catgramDef.find('span').remove();
	const catgram = catgramDef.text().replace(', ', '');
	const definition = $('.tlf_cdefinition:first-child').html();

	return {
		catgram,
		definition,
		source: { name: 'CNRTL', url }
	};
};
