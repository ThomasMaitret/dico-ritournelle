import phin from 'phin';
import cheerio, { CheerioAPI } from 'cheerio';

export async function fetchHTML(url: string): Promise<CheerioAPI | null> {
	try {
		const { body } = await phin(url);
		return cheerio.load(body);
	} catch (error) {
		return null;
	}
}
