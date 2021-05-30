import { chromium } from 'playwright';

export const searchRobert = async (word: string): Promise<SearchResult> => {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto(`https://dictionnaire.lerobert.com/definition/${word}`);

	const wordExists = await page.isVisible('#definitions');
	if (!wordExists) {
		await browser.close();
		return Promise.reject('Not found');
	}

	const [catgram, definition] = await Promise.all([
		await page.textContent('.d_cat'),
		await page.textContent('.d_dfn:first-child')
	]);

	await browser.close();

	return { catgram, definition, source: 'Robert' };
};
