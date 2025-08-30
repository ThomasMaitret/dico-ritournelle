import { loadHtml } from "./loadHtml";

export const searchLarousse = async (word: string): Promise<SearchResult> => {
  const prodUrl = `https://www.larousse.fr/dictionnaires/francais/${word}`;
  const url = import.meta.env.PROD ? prodUrl : `/robert/${word}`;
  const $ = await loadHtml(url);

  if (!$) {
    return null;
  }

  const wordExists = $(".Definitions");
  if (!wordExists) {
    return null;
  }

  const catgramDef = $(".CatgramDefinition");
  catgramDef.find("a").remove();

  return {
    source: {
      name: "larousse",
      url: prodUrl,
    },
  };
};
