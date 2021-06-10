import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';

export async function fetchHTML(url: string): Promise<CheerioAPI | null> {
	try {
		const { data } = await axios.get(url, { timeout: 5000 });
		return cheerio.load(data);
	} catch (error) {
		return null;
	}
}
