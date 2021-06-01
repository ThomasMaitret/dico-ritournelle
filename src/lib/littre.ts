import { fetchHTML } from './fetchHTML';

export const searchLittré = async (word: string): Promise<SearchResult> => {
	const $ = await fetchHTML(`https://www.littre.org/definition/${word}`);

	const wordExists = $('.definition');
	if (!wordExists) {
		return Promise.reject('Not found');
	}

	const catgram = ($('.entete b abbr').attr('title') || '').toString();
	$('.num').remove();
	$('cite').remove();
	$('p').remove();
	const definition = $('.corps li').html();

	return { catgram, definition, source: 'Littré' };
};
