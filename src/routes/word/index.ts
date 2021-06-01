import { searchLarousse } from '$lib/larousse';
import { searchLittré } from '$lib/littre';
import { searchRobert } from '$lib/robert';
import pkg from 'bluebird';
const { Promise } = pkg;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({
	query
}: {
	query: URLSearchParams;
}): Promise<{ body: { response: SearchResult } } | undefined> {
	const word = query.get('word');

	if (word) {
		const response = await searchWord(word);

		if (response) {
			return {
				body: {
					response
				}
			};
		}
	}
}

const searchWord = async (word: string): Promise<SearchResult | null> => {
	return await Promise.any([searchLarousse(word), searchRobert(word), searchLittré(word)]).catch(
		Promise.AggregateError,
		() => {
			return null;
		}
	);
};
