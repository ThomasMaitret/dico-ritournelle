import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';

export async function fetchHTML(url: string): Promise<CheerioAPI> {
	const { data } = await axios.get(url);
	return cheerio.load(data);
}
