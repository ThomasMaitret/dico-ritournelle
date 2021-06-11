import { searchCnrtl } from '$lib/cnrtl';
import { searchLarousse } from '$lib/larousse';
import { searchLittré } from '$lib/littre';
import { searchRobert } from '$lib/robert';
import { boutades } from '$lib/boutades';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({
	query
}: {
	query: URLSearchParams;
}): Promise<{ body: { response: WordResponse } } | undefined> {
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

const searchWord = async (word: string): Promise<WordResponse> => {
	const responses = await Promise.all([
		searchRobert(word),
		searchLittré(word),
		searchLarousse(word),
		searchCnrtl(word)
	]);
	const definition =
		responses[0]?.definition ||
		responses[1]?.definition ||
		responses[2]?.definition ||
		responses[3]?.definition ||
		null;
	const catgram =
		responses[0]?.catgram ||
		responses[1]?.catgram ||
		responses[2]?.catgram ||
		responses[3]?.catgram ||
		null;

	const sources = [];
	for (const response of responses) {
		if (response?.source) {
			sources.push(response.source);
		}
	}

	return {
		boutade: boutades[word],
		definition,
		catgram,
		sources
	};
};
