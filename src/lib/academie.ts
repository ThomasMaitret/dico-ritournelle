import { fetchHTML } from './fetchHTML';

export const searchAcademie = async (word: string): Promise<SearchResult> => {
	const url = `https://academie.atilf.fr/9/consulter/${word}`;
	const $ = await fetchHTML(url);

	if (!$) {
		return null;
	}

	const wordExists = $('.contenu-site');
	if (!wordExists) {
		return null;
	}

	console.log($('.contenuPrincipal').children().length);

	const firstArticle = $('.academie9tei');
	console.log(firstArticle.children());

	return {
		catgram: '',
		definition: '',
		source: { name: 'academie', url }
	};
};
