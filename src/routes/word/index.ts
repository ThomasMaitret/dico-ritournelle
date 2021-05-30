import { searchLarousse } from '$lib/larousse';
import { searchLittré } from '$lib/littré';
import { searchRobert } from '$lib/robert';
import { Promise } from 'bluebird';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({
	query
}: {
	query: URLSearchParams;
}): Promise<{ body: { response: SearchResult | string } }> {
	const word = query.get('word') || '';
	const response = await searchWord(word);

	return {
		body: {
			response: response || "Ce mot n'existe pas, looser !"
		}
	};
}

const searchWord = async (word: string): Promise<SearchResult | null> => {
	return await Promise.any([searchLarousse(word), searchRobert(word), searchLittré(word)]).catch(
		Promise.AggregateError,
		() => {
			return null;
		}
	);
};
