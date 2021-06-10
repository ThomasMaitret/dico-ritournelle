import { fetchHTML } from './fetchHTML';

export const searchLittré = async (word: string): Promise<SearchResult> => {
	const url = `https://www.littre.org/definition/${word}`;
	const $ = await fetchHTML(url);

	if (!$) {
		return null;
	}

	const wordExists = $('.definition');
	if (!wordExists) {
		return null;
	}

	const catgram = ($('.entete b abbr').attr('title') || '').toString();
	$('.num').remove();
	$('cite').remove();
	$('p').remove();
	const definition = $('.corps li').html();

	return {
		catgram,
		definition,
		source: { name: 'littré', url }
	};
};
