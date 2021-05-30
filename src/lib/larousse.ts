import { chromium } from 'playwright';

export const searchLarousse = async (word: string): Promise<SearchResult> => {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto(`https://www.larousse.fr/dictionnaires/francais/${word}`);

	const wordExists = await page.isVisible('.Definitions');
	if (!wordExists) {
		await browser.close();
		return Promise.reject('Not found');
	}

	const [catgram, definition] = await Promise.all([
		await page.textContent('.CatgramDefinition'),
		await page.textContent('.Definitions .DivisionDefinition:first-child')
	]);

	await browser.close();

	return { catgram, definition, source: 'Larousse' };
};
