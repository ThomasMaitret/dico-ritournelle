import { chromium } from 'playwright';

export const searchLittré = async (word: string): Promise<SearchResult> => {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto(`https://www.littre.org/definition/${word}`);

	const wordExists = await page.isVisible('.definition');
	if (!wordExists) {
		await browser.close();
		return Promise.reject('Not found');
	}

	const [catgram, definition] = await Promise.all([
		await page.getAttribute('.entete b abbr', 'title'),
		(await page.textContent('.corps li:first-child')) || ''
	]);

	await browser.close();

	return { catgram, definition, source: 'Littré' };
};
