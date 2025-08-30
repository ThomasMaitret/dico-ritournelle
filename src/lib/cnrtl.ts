import { loadHtml } from "./loadHtml";

export const searchCnrtl = async (word: string): Promise<SearchResult> => {
  const prodUrl = `https://www.cnrtl.fr/definition/${word}`;
  const url = import.meta.env.PROD ? prodUrl : `/robert/${word}`;
  const $ = await loadHtml(url);

  if (!$) {
    return null;
  }

  const wordExists = $("#lexicontent");
  if (!wordExists) {
    return null;
  }

  const catgramDef = $("#vitemselected:first-child a");
  catgramDef.find("span").remove();

  return {
    source: {
      name: "CNRTL",
      url: prodUrl,
    },
  };
};
