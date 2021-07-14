import { fetchHTML } from './fetchHTML';

export const searchRobert = async (word: string): Promise<SearchResult> => {
	const url = `https://dictionnaire.lerobert.com/definition/${word}`;
	const $ = await fetchHTML(url);

	if (!$) {
		return null;
	}

	const wordExists = $('#definitions');
	if (!wordExists) {
		return null;
	}

	$('.d_sound_cont').remove();

	const catgram = $('.d_cat:first').text();
	const definition = $('.d_ptma').html();

	return {
		catgram,
		definition,
		source: { name: 'robert', url }
	};
};
