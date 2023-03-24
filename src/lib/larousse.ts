import { loadHtml } from "./loadHtml";

export const searchLarousse = async (word: string): Promise<SearchResult> => {
  const url = `/larousse/${word}`;
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
  const catgram = catgramDef.text();
  const definition = $(".Definitions .DivisionDefinition:first-child").html();

  return {
    catgram,
    definition,
    source: {
      name: "larousse",
      url: `https://www.larousse.fr/dictionnaires/francais/${word}`,
    },
  };
};
